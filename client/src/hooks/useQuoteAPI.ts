import { useState, useCallback } from "react";
import { getRandomQuote } from "../services/api";
import { Quote } from "../types/quote";

export const useQuoteAPI = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRandomQuote();
      setQuote(response.data);
    } catch (err) {
      setError("Failed to fetch a new quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    quote,
    isLoading,
    error,
    fetchRandomQuote,
  };
};
