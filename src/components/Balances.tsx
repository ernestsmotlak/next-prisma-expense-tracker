import React, { useEffect, useState } from "react";

interface User {
    id: number;
    username: string;
}

interface ExpenseData {
    id: number;
    amountPaid: number;
    paidFor: string;
    expenseName: string;
    paidBy: User;
}

interface GroupData {
    expenses: ExpenseData[];
}

interface BalancesProps {
    group: GroupData;
    loggedInUserId: number;
}

const Balances: React.FC<BalancesProps> = ({ group, loggedInUserId }) => {
    const [balances, setBalances] = useState<Map<number, number>>(
        new Map()
    );

    useEffect(() => {
        const updatedBalances = new Map<number, number>();

        group.expenses.forEach((expense) => {
            const numPeople = expense.paidFor.split(",").length;
            const splitAmount = expense.amountPaid / numPeople;

            const payerId = expense.paidBy.id;

            // Update the payer's balance
            updatedBalances.set(
                payerId,
                (updatedBalances.get(payerId) || 0) + splitAmount
            );

            expense.paidFor.split(",").forEach((userIdStr) => {
                const userId = Number(userIdStr.trim());
                if (isNaN(userId) || userId === payerId) return;

                // Update the user's balance (they owe the payer)
                updatedBalances.set(
                    userId,
                    (updatedBalances.get(userId) || 0) - splitAmount
                );
            });
        });

        // Simplify balances to find net amounts owed
        setBalances(updatedBalances);
    }, [group]);

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Balances</h2>
            {Array.from(balances.entries()).map(([userId, balance]) => {
                if (balance === 0) return null; // Skip zero balances

                return (
                    <div key={userId} className="mb-4">
                        {userId === loggedInUserId ? (
                            <span>
                                You {balance > 0 ? 'are owed' : 'owe'} {Math.abs(balance).toFixed(2)} {balance > 0 ? 'by' : 'to'} user {userId}.
                            </span>
                        ) : (
                            <span>
                                User {userId} {balance > 0 ? 'owes you' : 'you owe'} {Math.abs(balance).toFixed(2)}.
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Balances;
