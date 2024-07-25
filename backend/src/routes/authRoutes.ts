import express from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/validate-token", authMiddleware, AuthController.validateToken);
router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleCallback);

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

export default router;
