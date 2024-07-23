import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET } from "../config";
import { AuthRequest } from "../middlewares/auth";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = new User({ email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  };

  static validateToken = async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
