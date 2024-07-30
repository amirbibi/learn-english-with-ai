import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./useUserContext";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignup = () => {
  // Initialize state variables
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );

  // Get user context, theme and navigation functions
  const navigate = useNavigate();
  const { register } = useUserContext();

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (validationErrors[name as keyof FormData]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setError(null);
      try {
        const success = await register(formData.email, formData.password);
        if (success) {
          navigate("/login");
        } else {
          setError("Email is already in use.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Validate form data before submission and display errors
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    validationErrors,
  };
};
