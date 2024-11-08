import React, { useEffect, useState } from "react";
import { arrayBuffer } from "stream/consumers";

interface Expense {
    id: number;
    amountPaid: number;
    paidFor: string;
    expenseName: string;
    paidBy: {
        id: number;
        username: string;
    };
}

interface Group {
    id: number;
    name: string;
    creatorId: number;
    creator: {
        id: number;
        username: string;
    };
    expenses: Expense[];
}

interface GroupProps {
    group: any;
    loggedInUser: number;
}

const Balances: React.FC<GroupProps> = ({ group, loggedInUser }) => {
    const myUsername: string | null = localStorage.getItem("username");

    useEffect(() => {
        group.expenses.forEach((expense: Expense) => {
            const amountPaid: number = expense.amountPaid;

            const paidForArray: string[] = expense.paidFor
                .split(",")
                .map((name) => name.trim());

            const paidByName = expense.paidBy.username;

            const filteredPaidForArray: string[] = paidForArray.filter(
                (name) => name !== paidByName
            );

            const amountPerPerson: number = amountPaid / paidForArray.length;

            const amountArray: number[] = new Array(
                filteredPaidForArray.length
            ).fill(amountPerPerson);

            console.log(`Expense: ${expense.expenseName}`);
            console.log(`Amount Paid: ${amountPaid}`);
            console.log(`Paid For: ${filteredPaidForArray.join(", ")}`);
            console.log(`Amount per person: ${amountPerPerson}`);
            console.log(`Amount Array: [${amountArray.join(", ")}]`);
            console.log("\n");
        });
    }, []);

    // get all amounts paid
    // get all paid for arrays (names of people that were paid for)

    //     check if any of the paidFor names are the same as the 'paid by name'
    //         if yes , remove the paidBy name out of the 'paid For array'
    //     calculate: amountPaid / length of the 'paid For array' in another array
    //     sum the values of the new array and display it

    return (
        <div className="mt-5 mb-5 p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="bg-purple-200 text-xl font-semibold">
                Balance is shown here:
            </h1>
            <br />
            Group: {JSON.stringify(group)}
            <br />
            User: {loggedInUser}
        </div>
    );
};

export default Balances;
