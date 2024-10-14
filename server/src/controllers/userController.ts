import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Route to get user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params; // Extract the user ID from the URL parameters

    try {
        // Ensure the logged-in user can only access their own data
        if (req.user?.id !== Number(id)) {
            return res.status(403).json({
                message:
                    "Access forbidden: You aren't authorized to view this data.",
            });
        }

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
  }

  try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
          where: { username },
      });

      if (existingUser) {
          return res.status(409).json({ message: "Username already exists" });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create a new user
      const newUser = await prisma.user.create({
          data: {
              username,
              password: hashedPassword,
          },
      });

      res.status(201).json({
          message: "User registered successfully",
          userId: newUser.id,
      });
  } catch (error: unknown) { // Type the error as unknown
      console.error(error); // Log the error to the console for debugging

      // Check if the error is an instance of Error
      if (error instanceof Error) {
          res.status(500).json({
              error: "An error occurred during registration",
              details: error.message, // Access the message property safely
          });
      } else {
          res.status(500).json({
              error: "An error occurred during registration",
              details: "Unknown error", // Fallback for non-Error types
          });
      }
  }
};