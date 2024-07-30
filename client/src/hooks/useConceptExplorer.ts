import { useState, useCallback, useEffect } from "react";
import { useConceptAPI } from "./api/useConceptAPI";
import { EvaluationResponse } from "../types/api";

interface ConceptExplorerState {
  concept: string;
  userDescription: string;
  evaluation: string;
  goodDescription: string;
  isSubmitted: boolean;
  isLoading: boolean;
}

export const useConceptExplorer = () => {
  const [state, setState] = useState<ConceptExplorerState>({
    concept: "",
    userDescription: "",
    evaluation: "",
    goodDescription: "",
    isSubmitted: false,
    isLoading: false,
  });

  const { getRandomConcept, submitDescription, error } = useConceptAPI();

  const updateState = useCallback((updates: Partial<ConceptExplorerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const actions = {
    handleDescriptionChange: useCallback(
      (value: string) => {
        updateState({ userDescription: value });
      },
      [updateState]
    ),

    handleSubmit: useCallback(async () => {
      updateState({ isSubmitted: true, isLoading: true });
      const result: EvaluationResponse = await submitDescription(
        state.concept,
        state.userDescription
      );
      updateState({
        evaluation: result.evaluation,
        goodDescription: result.goodDescription,
        isLoading: false,
      });
    }, [updateState, submitDescription, state.concept, state.userDescription]),

    handleNewConcept: useCallback(async () => {
      updateState({
        userDescription: "",
        isSubmitted: false,
        evaluation: "",
        goodDescription: "",
        isLoading: true,
      });

      updateState({ concept: (await getRandomConcept()).name });
    }, [updateState, getRandomConcept]),
  };

  useEffect(() => {
    actions.handleNewConcept();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.concept) {
      updateState({ isLoading: false });
    }
  }, [state.concept, updateState]);

  return { state, actions, error };
};
