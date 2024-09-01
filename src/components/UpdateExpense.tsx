"use client";
import { useEffect, useState } from "react";

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
  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Expense</h2>
      <p><strong>Expense Name:</strong> {expense.expenseName}</p>
      <p><strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}</p>
      <p><strong>Paid By:</strong> {expense.paidBy.username}</p>
      <p><strong>Paid For:</strong> {expense.paidFor}</p>
      {/* You can add more fields here to update the expense */}
    </div>
  );
};

export default UpdateExpense;
