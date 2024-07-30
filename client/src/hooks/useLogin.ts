import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  // Initialize state variables
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user context and navigation
  const { login } = useUserContext();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Attempt to log in with the provided credentials
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
