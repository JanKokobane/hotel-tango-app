import type{ Request, Response } from "express";
import bcrypt from "bcryptjs";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
}

const users: User[] = [];

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, contact } = req.body;

    if (!firstName || !lastName || !email || !password || !contact) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = { firstName, lastName, email, password: hashedPassword, contact };
    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: { firstName, lastName, email, contact },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};