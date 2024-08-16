import { Quote } from "../types/quote";
import { QuoteModel } from "../models/QuoteModel";
export class QuoteRepository {
  // Get a random quote
  async getRandomQuote(): Promise<Quote> {
    const count = await QuoteModel.countDocuments();
    if (count === 0) {
      throw new Error("No quotes available");
    }

    // Generates a random number between 0 and count - 1
    const random = Math.floor(Math.random() * count);
    const randomQuote = await QuoteModel.findOne().skip(random);

    if (!randomQuote) {
      throw new Error("Failed to retrieve a random quote");
    }

    return {
      text: randomQuote.text,
      author: randomQuote.author,
    };
  }
}
