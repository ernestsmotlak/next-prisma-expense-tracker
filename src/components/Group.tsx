"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      <h1 className="text-3xl font-bold mb-6 text-center">{group.name} Group</h1>
      <p className="text-xl mb-4">Created by: {group.creator.username}</p>

      <h2 className="text-2xl font-semibold mb-4">Expenses:</h2>
      <ul>
        {group.expenses.map((expense) => (
          <li key={expense.id} className="mb-4 bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <strong>{expense.expenseName}</strong><br />
            <span><strong>Amount Paid:</strong> ${expense.amountPaid.toFixed(2)}</span><br />
            <span><strong>Paid By:</strong> {expense.paidBy.username}</span><br />
            <span><strong>Paid For:</strong> {expense.paidFor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Group;
