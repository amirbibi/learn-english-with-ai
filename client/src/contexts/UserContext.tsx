import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useAuthAPI } from "../hooks/api/useAuthAPI";

interface User {
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: (token: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleLogout,
    handleTokenValidation,
  } = useAuthAPI();

  // Validate token keep user logged in
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const email = await handleTokenValidation();
      if (email) {
        setUser({ email });
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }, [handleTokenValidation]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  // Using useCallback to prevent unnecessary re-renders and memoize the function
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const success = await handleLogin(email, password);
        if (success) {
          setUser({ email });
        }
        return success;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    [handleLogin]
  );

  // Using useCallback to prevent unnecessary re-renders and memoize the function
  const googleLogin = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        const success = await handleGoogleLogin(token);
        if (success) {
          const email = await handleTokenValidation();
          if (email) {
            setUser({ email });
            return true;
          }
          throw new Error("Failed to get user email after Google login");
        }
        return false;
      } catch (error) {
        console.error("Google login failed:", error);
        return false;
      }
    },
    [handleGoogleLogin, handleTokenValidation]
  );

  // Using useCallback to prevent unnecessary re-renders and memoize the function
  const register = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        return await handleRegister(email, password);
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },
    [handleRegister]
  );

  const logout = useCallback(() => {
    handleLogout();
    setUser(null);
    localStorage.removeItem("token");
  }, [handleLogout]);

  // Using useMemo to prevent unnecessary re-renders and memoize the context value
  const contextValue = useMemo<UserContextType>(
    () => ({
      user,
      setUser,
      login,
      googleLogin,
      register,
      logout,
      isLoading,
    }),
    [user, login, googleLogin, register, logout, isLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
