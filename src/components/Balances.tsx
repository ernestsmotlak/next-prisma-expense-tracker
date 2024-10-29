import React, { useEffect, useState } from "react";

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
    // console.log(group);

    const amountsArray = group.expenses.map((expense: Expense) => expense.amountPaid);
    console.log("Amounts Array:", amountsArray);

    const paidForArray = group.expenses.map((expense: Expense) => expense.paidFor.split(','));
    console.log('PaidForArray: ', paidForArray);

    const myUsername = localStorage.getItem('username');

    const calculate = (amount: number, array: string[]): number[] => {
        return array.map(() => amount / array.length);
    };

    const paidForArray2 = group.expenses[0].paidFor.split(",").map((name: string) => name.trim());

    console.log('Here we are: ', calculate(group.expenses[0].amountPaid, paidForArray2));
    // console.log('Here we are: ' , calculate(group.expenses[0].amountPaid ,group.expenses[0]));


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
