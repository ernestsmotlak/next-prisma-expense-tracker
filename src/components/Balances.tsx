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
        <div className="mt-5 mb-5 p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Balances Owed by Each User
            </h1>
            {Object.entries(totalBalances).length === 0 ? (
                <p className="text-center text-gray-500">
                    No expenses recorded yet.
                </p>
            ) : (
                <ul className="space-y-4">
                    {Object.entries(totalBalances).map(
                        ([name, balanceData], index) => (
                            <li
                                key={index}
                                className="p-4 bg-gray-50 rounded-md shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-medium text-gray-700">
                                        {name} Owes to:
                                    </span>
                                    <span className="text-lg font-semibold text-blue-600">
                                        {balanceData.owesTo[0]}{" "}
                                        ${balanceData.amountOwed.toFixed(2)}
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
