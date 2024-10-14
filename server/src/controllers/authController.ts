import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const JWT_SECRET = "burek";

// Route to handle user login
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Fetch user from the database
    const user = await prisma.user.findUnique({ where: { username } });

    // Check if user exists and compare hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.json({ message: "Login successful", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
