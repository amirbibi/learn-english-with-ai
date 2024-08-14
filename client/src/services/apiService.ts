import axios, { AxiosInstance } from "axios";
import {
  LoginResponse,
  RegisterResponse,
  ValidateTokenResponse,
  EvaluationResponse,
} from "../lib/types/api";
import { Concept } from "../lib/types/concept";
import { Quote } from "../lib/types/quote";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    // Create an axios instance with a base URL
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    });

    // Include the auth token in the Authorization header at all times
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
    try {
      const response = await this.api.get<ValidateTokenResponse>(
        "/auth/validate-token"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to validate token: ${error}`);
    }
  }

  async getRandomConcept(
    category: string,
    difficulty: string
  ): Promise<Concept> {
    const response = await this.api.get<Concept>("/concept", {
      params: {
        category: category,
        difficulty: difficulty,
      },
    });
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
