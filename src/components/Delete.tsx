// Delete.tsx
import React from "react";

interface ExpenseData {
    id: number;
    amountPaid: number;
    paidFor: string;
    expenseName: string;
    paidBy: {
        id: number;
        username: string;
    };
}

interface DeleteProps {
    expense: ExpenseData;
    onCancel: () => void;
}

const Delete: React.FC<DeleteProps> = ({ expense, onCancel }) => {
    const handleDelete = () => {
        // Implement the deletion logic here
        console.log(`Deleting expense: ${expense.expenseName}`);
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">
                Are you sure you want to delete this expense?
            </h2>
            <p className="mb-4">
                <strong>Expense Name:</strong> {expense.expenseName}
            </p>
            <p className="mb-4">
                <strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Delete;
