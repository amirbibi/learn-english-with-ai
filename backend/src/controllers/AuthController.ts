import { Request, Response } from "express";
import { AuthRepository } from "../repositories/AuthRepository";
import { AuthRequest } from "../middlewares/validateJwtToken";
import { JwtService } from "../services/JwtService";
import { GoogleAuthService } from "../services/GoogleAuthService";

export class AuthController {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private googleAuthService: GoogleAuthService
  ) {}

  // Register a new user
  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const existingUser = await this.authRepository.findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      await this.authRepository.createUser({ email, password });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  };

  // Login a user
  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await this.authRepository.findUserByEmail(email);
      if (!user || !(await user.comparePassword(password))) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const token = this.jwtService.createToken(user._id);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  };

  // Get the current user
  getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const user = await this.authRepository.findUserById(req.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  // Google OAuth callback
  googleCallback = async (req: Request, res: Response): Promise<void> => {
    const { code } = req.query;

    if (typeof code !== "string") {
      res.status(400).json({ message: "Invalid authorization code" });
      return;
    }

    try {
      const { email, googleId } =
        await this.googleAuthService.verifyGoogleToken(code);
      let user = await this.authRepository.findUserByEmail(email);

      if (!user) {
        user = await this.authRepository.createUser({
          email,
          googleId,
          password: Math.random().toString(36).slice(-8),
        });
      } else if (!user.googleId) {
        user = await this.authRepository.updateUserGoogleId(user, googleId);
      }

      const token = this.jwtService.createToken(user._id);
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.error("Google callback error:", error);
      res
        .status(500)
        .json({ message: "Error processing Google callback", error });
    }
  };
}
