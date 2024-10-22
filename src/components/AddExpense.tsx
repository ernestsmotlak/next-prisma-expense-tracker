import React, { useState, useEffect } from "react";

interface User {
    id: number;
    username: string;
}

interface Group {
    id: number;
    name: string;
    users: User[];
}

const AddExpense: React.FC = () => {
    const [amountPaid, setAmountPaid] = useState<number | "">("");
    const [expenseName, setExpenseName] = useState<string>("");
    const [paidByUsername, setPaidByUsername] = useState<string>(""); // Selected user who paid
    const [paidForUsernames, setPaidForUsernames] = useState<string>(""); // Selected users for whom the expense is paid (as comma-separated)
    const [groupUsers, setGroupUsers] = useState<User[]>([]); // Group users state
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch groupId from localStorage
    const groupId = localStorage.getItem("groupId");

    // Fetch the group data, including users
    const fetchGroupUsers = async () => {
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
                throw new Error("Failed to fetch group users");
            }

            const data: Group = await response.json();
            setGroupUsers(data.users); // Set users from group data
        } catch (error: any) {
            setError(
                error.message || "An error occurred while fetching group users."
            );
        }
    };

    useEffect(() => {
        if (groupId) {
            fetchGroupUsers(); // Fetch group users when component mounts
        }
    }, [groupId]);

    const createExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Clear previous success/error messages
        setError(null);
        setSuccess(null);

        // Validate input
        if (
            !amountPaid ||
            !expenseName ||
            !paidByUsername ||
            paidForUsernames.trim() === ""
        ) {
            setError("Please fill out all fields.");
            return;
        }

        // Split the comma-separated usernames for "Paid For" into an array
        const paidForUsernamesArray = paidForUsernames
            .split(",")
            .map((username) => username.trim());

        // Payload object
        const expenseData = {
            groupId: groupId, // Ensure groupId is a string
            amountPaid,
            paidFor: paidForUsernamesArray,
            expenseName,
            paidByUsername,
        };
        
        console.log("Expense Data:", expenseData);


        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3012/api/expenses/addexpense",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(expenseData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json(); // Try to read the response body for more details
                throw new Error(
                    `Failed to add expense: ${
                        errorData.error || response.statusText
                    }`
                );
            }

            const data = await response.json();
            setSuccess("Expense added successfully!");
            console.log("Added Expense:", data);
        } catch (error: any) {
            setError(
                error.message || "An error occurred while adding the expense."
            );
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Expense</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <div className="mb-4">
                    <label
                        htmlFor="amountPaid"
                        className="block font-medium mb-1"
                    >
                        Amount Paid
                    </label>
                    <input
                        type="number"
                        id="amountPaid"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="expenseName"
                        className="block font-medium mb-1"
                    >
                        Expense Name
                    </label>
                    <input
                        type="text"
                        id="expenseName"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                {/* Paid By Input */}
                <div className="mb-4">
                    <label htmlFor="paidBy" className="block font-medium mb-1">
                        Paid By (Username)
                    </label>
                    <input
                        type="text"
                        id="paidBy"
                        value={paidByUsername}
                        onChange={(e) => setPaidByUsername(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                {/* Paid For Input */}
                <div className="mb-4">
                    <label htmlFor="paidFor" className="block font-medium mb-1">
                        Paid For (Usernames, comma-separated)
                    </label>
                    <input
                        type="text"
                        id="paidFor"
                        value={paidForUsernames}
                        onChange={(e) => setPaidForUsernames(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <button
                    type="button"
                    onClick={createExpense}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
