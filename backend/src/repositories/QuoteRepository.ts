import fs from "fs";
import path from "path";
import { Quote, QuoteData } from "../types/quote";

export class QuoteRepository {
  private quoteData: QuoteData;
  // Store the ID of the last quote returned to avoid duplicates
  private lastQuoteId: number | null = null;

  constructor() {
    // Load quote data from JSON file
    const filePath = path.join(process.cwd(), "data", "quotes.json");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Quote data file not found: ${filePath}`);
    }
    this.quoteData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  // Get a random quote
  getRandomQuote(): Quote {
    const { quotes } = this.quoteData;

    if (quotes.length === 0) {
      throw new Error("No quotes available");
    }

    // Get a random quote that is different from the last one
    let randomQuote;
    do {
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote.id === this.lastQuoteId && quotes.length > 1);

    this.lastQuoteId = randomQuote.id;
    return randomQuote;
  }
}
