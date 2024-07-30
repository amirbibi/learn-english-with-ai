import { useState, useCallback } from "react";
import { api } from "../../services/apiService";
import { Concept, EvaluationResponse } from "../../types/api";

export const useConceptAPI = () => {
  const [error, setError] = useState<string | null>(null);

  const getRandomConcept = useCallback(async (): Promise<Concept> => {
    setError(null);
    try {
      const result: Concept = await api.getRandomConcept();
      return result;
    } catch (err) {
      setError("Failed to fetch a new concept. Please try again.");
      console.error(err);
      return { name: "" };
    }
  }, []);

  const submitDescription = useCallback(
    async (
      concept: string,
      description: string
    ): Promise<EvaluationResponse> => {
      setError(null);
      try {
        const result: EvaluationResponse = await api.submitDescription(
          concept,
          description
        );
        return result;
      } catch (err) {
        setError("Failed to fetch a new concept. Please try again.");
        console.error(err);
        return { evaluation: "", goodDescription: "" };
      }
    },
    []
  );

  return {
    getRandomConcept,
    submitDescription,
    error,
  };
};
