import { Request, Response } from "express";
import { QuoteRepository } from "../repositories/QuoteRepository";

export class QuoteController {
  constructor(private quoteRepository: QuoteRepository) {}

  getRandomQuote = (req: Request, res: Response): void => {
    try {
      const quote = this.quoteRepository.getRandomQuote();
      res.status(200).json(quote);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      res.status(500).json({ error: "Failed to fetch a random quote" });
    }
  };
}
