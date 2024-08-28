"use client";
import { useEffect, useState } from "react";

interface Expense {
  paidByUsername: string;
  groupId: number;
  groupName: string;
  amountPaid: number;
  paidFor: string;
}

const UserExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const username = "alice"; // Assume 'alice' is the logged-in user

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3012/api/expenses/${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: Expense[] = await response.json();
        setExpenses(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchExpenses();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{username}'s Expenses</h1>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <p>Group: {expense.groupName}</p>
            <p>Amount Paid: ${expense.amountPaid}</p>
            <p>Paid For: {expense.paidFor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserExpensesPage;
