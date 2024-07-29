import axios, { AxiosInstance } from "axios";
import {
  LoginResponse,
  RegisterResponse,
  ValidateTokenResponse,
  Concept,
  EvaluationResponse,
} from "../types/api";
import { Quote } from "../types/quote";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    // Create an axios instance with a base URL
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    });

    // Add a request interceptor to include the token in all requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  async register(email: string, password: string): Promise<RegisterResponse> {
    const response = await this.api.post<RegisterResponse>("/auth/register", {
      email,
      password,
    });
    return response.data;
  }

  async validateToken(): Promise<ValidateTokenResponse> {
    const response = await this.api.get<ValidateTokenResponse>(
      "/auth/validate-token"
    );
    return response.data;
  }

  async getRandomConcept(): Promise<Concept> {
    const response = await this.api.get<Concept>("/concept");
    return response.data;
  }

  async submitDescription(
    concept: string,
    description: string
  ): Promise<EvaluationResponse> {
    const response = await this.api.post<EvaluationResponse>("/evaluate", {
      concept,
      description,
    });
    return response.data;
  }

  async getRandomQuote(): Promise<Quote> {
    const response = await this.api.get<Quote>("/quote");
    return response.data;
  }
}

export const api = new ApiService();
