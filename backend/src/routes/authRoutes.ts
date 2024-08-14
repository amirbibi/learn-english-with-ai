import express from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthRepository } from "../repositories/AuthRepository";
import { JwtService } from "../services/JwtService";
import { GoogleAuthService } from "../services/GoogleAuthService";

const router = express.Router();

// Create instances
const authRepository = new AuthRepository();
const jwtService = new JwtService();
const googleAuthService = new GoogleAuthService();
const authController = new AuthController(
  authRepository,
  jwtService,
  googleAuthService
);

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/validate-token",
  jwtService.validateToken,
  authController.getCurrentUser
);
router.get("/sessions/oauth/google", authController.googleCallback);

export default router;
