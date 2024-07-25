import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useAuthAPI } from "../hooks/useAuthAPI";

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

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const email = await handleTokenValidation();
          if (email) {
            setUser({ email });
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [handleTokenValidation]);

  const login = async (email: string, password: string) => {
    const success = await handleLogin(email, password);
    if (success) {
      setUser({ email });
    }
    return success;
  };

  const googleLogin = async (token: string) => {
    const success = await handleGoogleLogin(token);
    if (success) {
      try {
        // Validate the token and get the user's email
        const email = await handleTokenValidation();
        if (email) {
          setUser({ email });
          return true;
        } else {
          console.error("Failed to get user email after Google login");
          return false;
        }
      } catch (error) {
        console.error("Error validating token after Google login:", error);
        return false;
      }
    }
    return false;
  };

  const register = async (email: string, password: string) => {
    const success = await handleRegister(email, password);
    return success;
  };

  const logout = () => {
    handleLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, googleLogin, register, logout, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
