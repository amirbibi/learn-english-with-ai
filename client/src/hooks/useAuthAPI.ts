import { useState, useCallback } from "react";
import { api } from "../services/apiService";

interface AuthError extends Error {
  code?: string;
}

export const useAuthAPI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle API calls with error handling
  const withErrorHandling = useCallback(
    async <T>(
      operation: () => Promise<T>,
      errorMessage: string
    ): Promise<T | false> => {
      const handleError = (err: unknown, defaultMessage: string) => {
        if (err instanceof Error) {
          setError(
            (err as AuthError).code
              ? `${defaultMessage}: ${(err as AuthError).code}`
              : err.message
          );
        } else {
          setError(defaultMessage);
        }
        return false;
      };

      setIsLoading(true);
      setError(null);
      try {
        return await operation();
      } catch (err) {
        handleError(err, errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );

  const handleLogin = useCallback(
    (email: string, password: string) =>
      withErrorHandling(async () => {
        const { token } = await api.login(email, password);
        localStorage.setItem("token", token);
        return true;
      }, "Login failed"),
    [withErrorHandling]
  );

  const handleGoogleLogin = useCallback(
    (token: string) =>
      withErrorHandling(async () => {
        localStorage.setItem("token", token);
        return true;
      }, "Google login failed"),
    [withErrorHandling]
  );

  const handleRegister = useCallback(
    (email: string, password: string) =>
      withErrorHandling(async () => {
        await api.register(email, password);
        return true;
      }, "Registration failed"),
    [withErrorHandling]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const handleTokenValidation = useCallback(
    () =>
      withErrorHandling(async () => {
        const response = await api.validateToken();
        return response.email;
      }, "Token validation failed"),
    [withErrorHandling]
  );

  return {
    isLoading,
    error,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleLogout,
    handleTokenValidation,
  };
};
