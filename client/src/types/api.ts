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
  name: string;
}

export interface EvaluationResponse {
  evaluation: string;
  goodDescription: string;
}
