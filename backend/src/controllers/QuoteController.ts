import { Request, Response } from "express";
import { QuoteRepository } from "../repositories/QuoteRepository";

export class QuoteController {
  constructor(private quoteRepository: QuoteRepository) {}

  // Get a random quote
  getRandomQuote = async (req: Request, res: Response): Promise<void> => {
    try {
      const quote = await this.quoteRepository.getRandomQuote();
      res.status(200).json(quote);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      res.status(500).json({ error: "Failed to fetch a random quote" });
    }
  };
}
