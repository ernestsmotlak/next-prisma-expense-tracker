import React from "react";

const AddExpense: React.FC = () => {
    return (
        <div className="flex justify-center mt-4">
            <button className="flex items-center bg-purple-200 p-2 rounded-md hover:bg-purple-300">
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
    );
};

export default AddExpense;
