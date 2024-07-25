import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET } from "../config";
import { AuthRequest } from "../middlewares/auth";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

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

  static googleAuth = async (req: Request, res: Response) => {
    if (!CLIENT_ID || !REDIRECT_URI) {
      return res
        .status(500)
        .json({ error: "Google OAuth configuration is missing" });
    }

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", CLIENT_ID);
    url.searchParams.append("redirect_uri", REDIRECT_URI);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("scope", "profile email");

    res.redirect(url.toString());
  };

  static googleCallback = async (req: Request, res: Response) => {
    console.log("Google callback");
    // const { code } = req.query;
    // try {
    //   // Exchange authorization code for access token
    //   const { data } = await axios.post(
    //     "<https://oauth2.googleapis.com/token>",
    //     {
    //       client_id: CLIENT_ID,
    //       client_secret: CLIENT_SECRET,
    //       code,
    //       redirect_uri: REDIRECT_URI,
    //       grant_type: "authorization_code",
    //     }
    //   );
    //   const { access_token, id_token } = data;
    //   // Use access_token or id_token to fetch user profile
    //   const { data: profile } = await axios.get(
    //     "<https://www.googleapis.com/oauth2/v1/userinfo>",
    //     {
    //       headers: { Authorization: `Bearer ${access_token}` },
    //     }
    //   );
    //   // Code to handle user authentication and retrieval using the profile data
    //   res.redirect("/");
    // } catch (error: any) {
    //   console.error("Error:", error.response.data.error);
    //   res.redirect("/login");
    // }
  };
}
