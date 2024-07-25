import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}` || "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const validateToken = async () => {
  const response = await api.get("/auth/validate-token");
  return response.data;
};

export const getRandomConcept = async () => {
  const response = await api.get("/concept");
  return response.data;
};

export const submitDescription = async (
  concept: string,
  description: string
) => {
  const response = await api.post("/evaluate", { concept, description });
  return response.data;
};

export const getRandomQuote = async () => {
  const response = await api.get("/quote");
  return response.data;
};

export default api;
