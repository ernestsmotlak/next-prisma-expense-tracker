import React, { useEffect, useState } from "react";

interface Expense {
    id: number;
    amountPaid: number;
    paidFor: string;
    expenseName: string;
    paidBy: {
        id: number;
        username: string;
    };
}

interface Group {
    id: number;
    name: string;
    creatorId: number;
    creator: {
        id: number;
        username: string;
    };
    expenses: Expense[];
}

interface GroupProps {
    group: any;
    loggedInUser: number;
}

const Balances: React.FC<GroupProps> = ({ group, loggedInUser }) => {
    const [totalBalances, setTotalBalances] = useState<
        Record<string, { amountOwed: number; owesTo: string[] }>
    >({});

    useEffect(() => {
        const balances: Record<
            string,
            { amountOwed: number; owesTo: string[] }
        > = {};

        group.expenses.forEach((expense: Expense) => {
            const amountPaid = expense.amountPaid;
            const paidForArray = expense.paidFor
                .split(",")
                .map((name) => name.trim());
            const paidByName = expense.paidBy.username;

            // Filter out the paidBy person from the list of paidFor people
            const filteredPaidForArray = paidForArray.filter(
                (name) => name !== paidByName
            );

            const amountPerPerson = amountPaid / paidForArray.length; // Amount per person

            filteredPaidForArray.forEach((name) => {
                // Track how much each user owes and who they owe money to
                if (!balances[name]) {
                    balances[name] = { amountOwed: 0, owesTo: [] };
                }
                balances[name].amountOwed += amountPerPerson; // Add the amount they owe
                balances[name].owesTo.push(paidByName); // Record who they owe money to
            });
        });

        // Update the state with total balances for each user
        const updatedBalances: Record<
            string,
            { amountOwed: number; owesTo: string[] }
        > = {};
        for (const [name, balanceData] of Object.entries(balances)) {
            updatedBalances[name] = balanceData;
        }

        setTotalBalances(updatedBalances);
    }, [group.expenses]);

    return (
        <div className="mt-8 mb-8 p-6 bg-gray-50 rounded-lg shadow-xl max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
                Balances Owed by Each User
            </h1>
            {Object.entries(totalBalances).length === 0 ? (
                <p className="text-center text-gray-600">
                    No expenses recorded yet.
                </p>
            ) : (
                <ul className="space-y-6">
                    {Object.entries(totalBalances).map(
                        ([name, balanceData], index) => (
                            <li
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-teal-500"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-medium text-gray-800">
                                        <strong>{name}</strong> owes
                                    </span>
                                    <span className="text-lg font-semibold text-teal-600">
                                        ${balanceData.amountOwed.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-gray-500">
                                        {balanceData.owesTo[0]}
                                    </span>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
};

export default Balances;
