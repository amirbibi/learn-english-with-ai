import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteRepository } from "../repositories/QuoteRepository";

const router = express.Router();
const quoteRepository = new QuoteRepository();
const quoteController = new QuoteController(quoteRepository);

router.get("/quote", quoteController.getRandomQuote);

export default router;
