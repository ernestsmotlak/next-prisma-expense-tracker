import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { group } from "console";

const prisma = new PrismaClient();

export const getExpensesForUser = async (req: Request, res: Response) => {
  const { username } = req.params; // Username as a URL parameter

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        paidBy: {
          username: username,
        },
      },
      include: {
        paidBy: {
          select: {
            username: true, // Include only the username from the User model
            password: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true, // Include the group name
          },
        },
      },
    });

    // Format the response to include only the desired fields
    const formattedExpenses = expenses.map((expense: any) => ({
      paidByUsername: expense.paidBy.username, // Add the full username to each expense
      password: expense.paidBy.password,
      groupId: expense.group.id, // Add the group ID
      groupName: expense.group.name, // Add the group name
      amountPaid: expense.amountPaid, // Add the amount paid
      paidFor: expense.paidFor, // Add the paid for field
    }));

    res.json(formattedExpenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  const { userId } = req.params; // Get userId from URL parameters
  const { groupId, amountPaid, paidFor, expenseName } = req.body; // Get other data from request body

  console.log("userId:", userId);
  console.log("groupId:", groupId);
  console.log("amountPaid:", amountPaid);
  console.log("paidFor:", paidFor);
  console.log("expenseName:", expenseName);

  try {
    // Convert the values to the correct types
    const groupIdInt = parseInt(groupId, 10);
    const userIdInt = parseInt(userId, 10);
    const amountPaidFloat = parseFloat(amountPaid);

    // Check if the conversions are successful and if expenseName is provided
    if (
      isNaN(groupIdInt) ||
      isNaN(userIdInt) ||
      isNaN(amountPaidFloat) ||
      !expenseName ||
      expenseName.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Invalid input data or missing expenseName" });
    }

    // Create a new expense linked to the userId from params
    const newExpense = await prisma.expense.create({
      data: {
        groupId: groupIdInt,
        paidById: userIdInt,
        amountPaid: amountPaidFloat,
        paidFor: paidFor,
        expenseName: expenseName, // Explicitly require this field
      },
    });

    res.status(201).json(newExpense); // Respond with the created expense
  } catch (error) {
    console.error("Error adding expense:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the expense" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params; // Correctly extract expenseId from URL parameters
  const { expenseName, amountPaid, paidFor } = req.body; // Get updated data from request body

  try {
    const amountPaidFloat = parseFloat(amountPaid);

    if (isNaN(amountPaidFloat) || !expenseName || expenseName.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid input data or missing expenseName" });
    }

    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(expenseId, 10) }, // Use expenseId here
      data: {
        expenseName,
        amountPaid: amountPaidFloat,
        paidFor,
      },
    });

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(updatedExpense); // Respond with the updated expense
  } catch (error) {
    console.error("Error updating expense:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the expense" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;
  const { groupId } = req.body;

  try {
    const expense_id = Number(expenseId);
    const group_id = Number(groupId);

    if (isNaN(expense_id) || isNaN(group_id)) {
      return res
        .status(400)
        .json({ error: "Invalid input data or missing expenseName" });
    }

    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: group_id },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the expense exists and belongs to the specified group
    const expense = await prisma.expense.findFirst({
      where: {
        id: expense_id,
        groupId: group_id,
      },
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found!" });
    }

    // Delete the expense
    await prisma.expense.delete({
      where: { id: expense_id },
    });

    // Optionally, update any related data (e.g., balances, totals, etc.)
    // depending on your application's requirements.

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the expense" });
  }
};
