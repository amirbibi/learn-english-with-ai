import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteRepository } from "../repositories/QuoteRepository";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const quoteRepository = new QuoteRepository();
const quoteController = new QuoteController(quoteRepository);

router.get("/quote", authMiddleware, quoteController.getRandomQuote);

export default router;
