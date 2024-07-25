import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
} from "../config";
import { AuthRequest } from "../middlewares/auth";
import { OAuth2Client } from "google-auth-library";

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

  static googleCallback = async (req: Request, res: Response) => {
    console.log("Google callback request:", req.query);
    const client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
    try {
      const { code } = req.query;

      if (typeof code !== "string") {
        return res.status(400).json({ message: "Invalid authorization code" });
      }

      // Exchange the authorization code for tokens
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      // Fetch the user's profile information
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return res
          .status(400)
          .json({ message: "Unable to verify Google token" });
      }

      const { email, sub: googleId } = payload;

      // Check if the user already exists
      let user = await User.findOne({ email });

      if (!user) {
        // Create a new user if they don't exist
        user = new User({
          email,
          googleId,
          password: Math.random().toString(36).slice(-8),
        });
        await user.save();
      } else {
        // Update the existing user's Google ID if it's not set
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
      }

      // Generate a JWT for the user
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Redirect the user to the frontend with the token
      // TODO: More secure method to transfer the token
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.error("Google callback error:", error);
      res
        .status(500)
        .json({ message: "Error processing Google callback", error });
    }
  };
}
