import { useState } from "react";
import { getRandomConcept, submitDescription } from "../services/api";
import { Concept, Evaluation } from "../types";

export const useConceptAPI = () => {
  const [concept, setConcept] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [goodDescription, setGoodDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRandomConcept = async () => {
    setIsLoading(true);
    setError("");
    try {
      const newConcept: Concept = await getRandomConcept();
      setConcept(newConcept.name);
      setEvaluation("");
      setGoodDescription("");
    } catch (err) {
      setError("Failed to fetch a new concept. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateDescription = async (concept: string, description: string) => {
    setIsLoading(true);
    setError("");
    try {
      const result: Evaluation = await submitDescription(concept, description);
      setEvaluation(result.evaluation);
      setGoodDescription(result.goodDescription);
    } catch (err) {
      setError("Failed to submit description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
