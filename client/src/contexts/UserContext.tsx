import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useAuthAPI } from "../hooks/useAuthAPI";

interface User {
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
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
  const { handleLogin, handleRegister, handleLogout, handleTokenValidation } =
    useAuthAPI();

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
      value={{ user, setUser, login, register, logout, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
