import { useState, useCallback } from "react";
import { api } from "../../services/apiService";

export const useConceptAPI = () => {
  const [concept, setConcept] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [goodDescription, setGoodDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch a random concept from the API
  const fetchRandomConcept = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const newConcept = await api.getRandomConcept();
      setConcept(newConcept.name);
      setEvaluation("");
      setGoodDescription("");
    } catch (err) {
      setError("Failed to fetch a new concept. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Submit a description for evaluation
  const evaluateDescription = useCallback(
    async (concept: string, description: string) => {
      setIsLoading(true);
      setError("");
      try {
        const result = await api.submitDescription(concept, description);
        setEvaluation(result.evaluation);
        setGoodDescription(result.goodDescription);
      } catch (err) {
        setError("Failed to submit description. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    concept,
    evaluation,
    goodDescription,
    isLoading,
    error,
    getRandomConcept: fetchRandomConcept,
    submitDescription: evaluateDescription,
  };
};
