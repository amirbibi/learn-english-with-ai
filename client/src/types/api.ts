import { Quote } from "./quote";

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ValidateTokenResponse {
  email: string;
}

export interface Concept {
  id: string;
  name: string;
}

export interface EvaluationResponse {
  evaluation: string;
  goodDescription: string;
}

export interface QuoteResponse {
  data: Quote;
}
