import { useState, useCallback } from "react";
import { api } from "../../services/apiService";
import { Quote } from "../../lib/types/quote";

export const useQuoteAPI = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a random quote from the API
  const fetchRandomQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await api.getRandomQuote();
      setQuote(newQuote);
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
