"use client"
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
}

interface Expense {
  expenseName: string;
  amountPaid: number;
  paidBy: User | User[]; // Adjusted to handle both single object and array
  paidFor: string;
}

const ShowAllGroups = () => {
  const [groups, setGroups] = useState<any[]>([]); // Changed to any[] for flexibility
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");

      if (!token || !userId) {
        setError("User not authenticated or ID not found");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3012/group/showallgroups/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setGroups(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchGroups();
  }, [userId]);

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">{username}'s Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 shadow-lg hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Creator:</strong> {group.creator.username}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Participants:</strong> {group.participants.map((p: User) => p.username).join(', ')}
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Expenses:</h3>
              {group.expenses.map((expense: Expense) => (
                <div key={expense.id} className="mb-4">
                  <h4 className="text-md font-semibold">{expense.expenseName}</h4>
                  <p>
                    <strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}
                  </p>
                  <p>
                    <strong>Paid By:</strong> {Array.isArray(expense.paidBy) ? expense.paidBy.map(p => p.username).join(', ') : expense.paidBy.username}
                  </p>
                  <p>
                    <strong>Paid For:</strong> {expense.paidFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllGroups;
