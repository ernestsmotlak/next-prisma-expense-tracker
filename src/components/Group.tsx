import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UpdateExpense from "@/components/UpdateExpense";
import AddExpense from "./AddExpense";

interface GroupData {
    id: number;
    name: string;
    creator: {
        id: number;
        username: string;
    };
    expenses: {
        id: number;
        amountPaid: number;
        paidFor: string;
        expenseName: string;
        paidBy: {
            id: number;
            username: string;
        };
    }[];
}

interface GroupProps {
    groupId: number;
}

const Group: React.FC<GroupProps> = ({ groupId }) => {
    const [showComponent, setShowComponent] = useState<boolean>(true);
    const [group, setGroup] = useState<GroupData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedExpense, setSelectedExpense] = useState<
        GroupData["expenses"][0] | null
    >(null);
    const router = useRouter();

    const fetchGroupData = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:3012/group/${groupId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch group data");
            }

            const data: GroupData = await response.json();
            setGroup(data);
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (groupId) {
            fetchGroupData();
        }
    }, [groupId]);

    const handleUpdateSuccess = () => {
        setSelectedExpense(null); // Close the update form
        fetchGroupData(); // Reload the group data to reflect the updated expense
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!group) {
        return <div>Loading...</div>;
    }

    const showAddExpense = (): void => {
        setShowComponent(!showComponent);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center underline underline-offset-8">
                {group.name}
            </h1>
            <p className="text-center text-xl mb-4">
                Created by: {group.creator.username}
            </p>
            <h2 className="text-center text-2xl font-semibold mb-4">
                Expenses:
            </h2>
            <p className="text-center">
                Here goes the current state of what you owe/are owed!
            </p>{" "}
            <div className="flex justify-center mt-4">
                <button
                    className="flex items-center bg-purple-200 p-2 rounded-md hover:bg-purple-300"
                    onClick={showAddExpense}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    <span className="ps-2">Expense</span>
                </button>
            </div>
            {!showComponent ? <AddExpense /> : null}
            <br />
            {!selectedExpense ? (
                <ul>
                    {group.expenses.map((expense) => (
                        <li
                            key={expense.id}
                            className="mx-auto w-full max-w-lg mb-4 bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center bg-green-300 cursor-pointer"
                            onClick={() => setSelectedExpense(expense)}
                        >
                            <div>
                                <strong>{expense.expenseName}</strong>
                                <br />
                                <span>
                                    <strong>Amount Paid:</strong> $
                                    {expense.amountPaid.toFixed(2)}
                                </span>
                                <br />
                                <span>
                                    <strong>Paid By:</strong>{" "}
                                    {expense.paidBy.username}
                                </span>
                                <br />
                                <span>
                                    <strong>Paid For:</strong> {expense.paidFor}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col space-y-2">
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <UpdateExpense
                        expense={selectedExpense}
                        onSuccess={handleUpdateSuccess}
                    />
                    <button
                        type="button"
                        onClick={() => setSelectedExpense(null)}
                        className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Back to Expenses
                    </button>
                </div>
            )}
        </div>
    );
};

export default Group;
