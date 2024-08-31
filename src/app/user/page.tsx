import ShowAllGroups from "@/components/ShowAllGroups";

const Page: React.FC = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ShowAllGroups />
    </div>
  );
};

export default Page;

/* "use client";
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
  // const username = "alice"; 
  const username = localStorage.getItem('username');

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
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">{username}'s Expenses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 shadow-lg hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{expense.groupName}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <strong>Paid For:</strong> {expense.paidFor}
              <br/>
              GroupID: {expense.groupId}<br/>
              
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserExpensesPage;
*/
