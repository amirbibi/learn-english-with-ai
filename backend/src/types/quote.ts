export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface QuoteData {
  quotes: Quote[];
}
