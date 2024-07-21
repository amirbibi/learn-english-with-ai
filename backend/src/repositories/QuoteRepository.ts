import fs from "fs";
import path from "path";
import { Quote, QuoteData } from "../types/quote";

export class QuoteRepository {
  private quoteData: QuoteData;
  private lastQuoteIndex: number | null = null;

  constructor() {
    const filePath = path.join(process.cwd(), "data", "quotes.json");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Quote data file not found: ${filePath}`);
    }
    this.quoteData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  getRandomQuote(): Quote {
    const { quotes } = this.quoteData;
    if (quotes.length === 0) {
      throw new Error("No quotes available");
    }

    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === this.lastQuoteIndex && quotes.length > 1);

    this.lastQuoteIndex = randomIndex;
    return quotes[randomIndex];
  }
}
