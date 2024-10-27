// Delete.tsx
import React from 'react';

interface DeleteProps {
    expense: {
        id: number;
        expenseName: string;
    };
    onCancel: () => void;
}

const Delete: React.FC<DeleteProps> = ({ expense, onCancel }) => {
    const handleConfirm = () => {
        // Handle delete logic
        console.log(`Deleting expense: ${expense.expenseName}`);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md z-10">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p>Are you sure you want to delete {expense.expenseName}?</p>
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
                <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Delete;
