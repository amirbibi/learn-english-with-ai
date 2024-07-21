import axios from "axios";
import { Concept } from "../types/concept";
import { Evaluation } from "../types/evaluation";

const API_BASE_URL = "http://localhost:5000/api";

export const getRandomConcept = async (): Promise<Concept> => {
  const response = await axios.get(`${API_BASE_URL}/concept`);
  return response.data;
};

export const submitDescription = async (
  concept: string,
  description: string
): Promise<Evaluation> => {
  const response = await axios.post(`${API_BASE_URL}/evaluate`, {
    concept,
    description,
  });
  return response.data;
};
