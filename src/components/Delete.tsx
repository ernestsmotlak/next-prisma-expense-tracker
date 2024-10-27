// Delete.tsx
import { error } from "console";
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
        <div className="">
            {JSON.stringify(expense)}
            <br/><br/><br/>
            <button>
                Hi!
            </button>
            <button>
                Hi!
            </button>
        </div>
    );
};

export default Delete;
