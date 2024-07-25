import express from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/validate-token", authMiddleware, AuthController.validateToken);
router.get("/sessions/oauth/google", AuthController.googleCallback);

export default router;
