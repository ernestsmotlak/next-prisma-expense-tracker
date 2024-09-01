"use client";
import { useState } from "react";

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

interface UpdateExpenseProps {
  expense: ExpenseData;
}

const UpdateExpense: React.FC<UpdateExpenseProps> = ({ expense }) => {
  const [expenseName, setExpenseName] = useState<string>(expense.expenseName);
  const [amountPaid, setAmountPaid] = useState<number>(expense.amountPaid);
  const [paidFor, setPaidFor] = useState<string>(expense.paidFor);
  const [paidBy, setPaidBy] = useState<string>(expense.paidBy.username);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedExpense = {
      id: expense.id,
      expenseName,
      amountPaid,
      paidFor,
      paidBy, // Assuming you have logic to handle this correctly in the backend
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3012/expenses/update/${expense.id}`, {
        method: "PUT", // Use PUT or POST depending on your backend setup
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error("Failed to update the expense");
      }

      // Optionally, handle successful update (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error("Error updating expense:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Expense</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Expense Name</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Paid For</label>
        <input
          type="text"
          value={paidFor}
          onChange={(e) => setPaidFor(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Paid By</label>
        <input
          type="text"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
          disabled // Disable if you don't want users to edit this
        />
      </div>

      <button
        type="submit"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateExpense;
