"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UpdateExpense from "@/components/UpdateExpense";

interface GroupData {
  id: number;
  name: string;
  creator: {
    id: number;
    username: string;
  };
  expenses: {
    id: number;
    amountPaid: number;
    paidFor: string;
    expenseName: string;
    paidBy: {
      id: number;
      username: string;
    };
  }[];
}

interface GroupProps {
  groupId: number;
}

const Group: React.FC<GroupProps> = ({ groupId }) => {
  const [group, setGroup] = useState<GroupData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<GroupData['expenses'][0] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:3012/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }

        const data: GroupData = await response.json();
        setGroup(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center underline underline-offset-8">
        {group.name}
      </h1>
      <p className="text-center text-xl mb-4">Created by: {group.creator.username}</p>

      <h2 className="text-center text-2xl font-semibold mb-4">Expenses:</h2>
      <p className="text-center">Here goes the current state of what you owe/are owed!</p> <br/>

      {!selectedExpense ? (
        <ul>
          {group.expenses.map((expense) => (
            <li
              key={expense.id}
              className="mx-auto w-full max-w-lg mb-4 bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center bg-green-300 cursor-pointer"
              onClick={() => setSelectedExpense(expense)}
            >
              <div>
                <strong>{expense.expenseName}</strong>
                <br />
                <span>
                  <strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}
                </span>
                <br />
                <span>
                  <strong>Paid By:</strong> {expense.paidBy.username}
                </span>
                <br />
                <span>
                  <strong>Paid For:</strong> {expense.paidFor}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <UpdateExpense expense={selectedExpense} />
          <button
            type="button"
            onClick={() => setSelectedExpense(null)}
            className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Back to Expenses
          </button>
        </div>
      )}
    </div>
  );
};

export default Group;
