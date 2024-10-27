// Delete.tsx
import React from 'react';

interface DeleteProps {
    expense: {
        id: number;
        expenseName: string;
    };
    onCancel: () => void;
    groupId: number; // Include groupId for API call
    onDeleteSuccess: () => void; // Callback to notify success
}

const Delete: React.FC<DeleteProps> = ({ expense, onCancel, groupId, onDeleteSuccess }) => {
    const handleConfirm = async () => {
        // console.log(`Deleting expense: ${expense.expenseName}`);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:3012/api/expenses/delete/${expense.id}`, // Update to the correct endpoint
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ groupId }), // Pass groupId in the body
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete expense");
            }

            onDeleteSuccess(); // Call success callback after deletion
        } catch (error: any) {
            console.error("Error deleting expense:", error.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md z-10">
            <h1>{JSON.stringify(expense)}</h1>
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
