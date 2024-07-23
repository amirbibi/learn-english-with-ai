import { useState, useCallback } from "react";
import { login, register, validateToken } from "../services/api";

export const useAuthAPI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegister = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await register(email, password);
        return true;
      } catch (err) {
        setError("Registration failed. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const handleTokenValidation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await validateToken();
      return response.email;
    } catch (err) {
      setError("Token validation failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    handleTokenValidation,
  };
};
