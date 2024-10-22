import { useState, useCallback, useEffect, useMemo } from "react";
import { useConceptAPI } from "./api/useConceptAPI";
import { EvaluationResponse } from "../lib/types/api";
import { Concept } from "../lib/types/concept";
import { MAX_DESCRIPTION_LENGTH } from "../lib/constants";

interface ConceptExplorerState {
  concept: string;
  category: string;
  difficulty: string;
  userDescription: string;
  evaluation: string;
  goodDescription: string;
  isSubmitted: boolean;
  isLoading: boolean;
  progressBarValue?: number;
}

export const useConceptExplorer = () => {
  const [state, setState] = useState<ConceptExplorerState>({
    concept: "",
    category: "",
    difficulty: "",
    isLoading: false,
    isSubmitted: false,
    userDescription: "",
    evaluation: "",
    goodDescription: "",
    progressBarValue: 0,
  });

  const { getRandomConcept, submitDescription, error } = useConceptAPI();

  const updateState = useCallback((updates: Partial<ConceptExplorerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const actions = useMemo(
    () => ({
      handleDescriptionChange: (value: string) => {
        if (value.length <= MAX_DESCRIPTION_LENGTH) {
          updateState({ userDescription: value });
        }
      },

      handleSubmit: async () => {
        updateState({ isSubmitted: true, isLoading: true });
        const result: EvaluationResponse = await submitDescription(
          state.concept,
          state.userDescription
        );
        updateState({
          userDescription: "",
          evaluation: result.evaluation,
          goodDescription: result.goodDescription,
          isLoading: false,
        });
      },

      handleNewConcept: async (category: string, difficulty: string) => {
        const newConcept: Concept = await getRandomConcept(
          category,
          difficulty
        );

        updateState({
          concept: newConcept.name,
          difficulty: newConcept.difficulty,
          category: newConcept.category,
          isSubmitted: false,
          evaluation: "",
          goodDescription: "",
          isLoading: true,
        });
      },

      handleTryAgain: () => {
        updateState({
          isSubmitted: false,
          evaluation: "",
          goodDescription: "",
        });
      },
    }),
    [
      updateState,
      submitDescription,
      state.concept,
      state.userDescription,
      getRandomConcept,
    ]
  );

  useEffect(() => {
    if (state.concept) {
      updateState({ isLoading: false });
    }
  }, [state.concept, updateState]);

  return { state, actions, error };
};
