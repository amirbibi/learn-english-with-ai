import express from "express";
import { AuthController } from "../controllers/AuthController";
import { validateJwtToken } from "../middlewares/validateJwtToken";
import { AuthRepository } from "../repositories/AuthRepository";

const router = express.Router();

// Create instances
const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", validateJwtToken, authController.getCurrentUser);
router.get("/sessions/oauth/google", authController.googleCallback);

export default router;
