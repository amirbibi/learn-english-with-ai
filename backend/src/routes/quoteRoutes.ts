import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteRepository } from "../repositories/QuoteRepository";
import { validateJwtToken } from "../middlewares/validateJwtToken";

const router = express.Router();

// Create instances
const quoteRepository = new QuoteRepository();
const quoteController = new QuoteController(quoteRepository);

// Routes
router.get("/quote", validateJwtToken, quoteController.getRandomQuote);

export default router;
