import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteRepository } from "../repositories/QuoteRepository";
import { JwtService } from "../services/JwtService";

const router = express.Router();

// Create instances
const jwtService = new JwtService();
const quoteRepository = new QuoteRepository();
const quoteController = new QuoteController(quoteRepository);

// Routes
router.get("/quote", jwtService.validateToken, quoteController.getRandomQuote);

export default router;
