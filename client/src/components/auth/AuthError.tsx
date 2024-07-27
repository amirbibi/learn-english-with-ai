import { Alert, AlertTitle, Button } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DEFAULT_ERROR_MESSAGE = "An error occurred during authentication.";

// AuthError component to display an error message when authentication fails
const AuthError: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get error message from URL query params, if any
  const params = new URLSearchParams(location.search);
  const errorMessage = params.get("message") || DEFAULT_ERROR_MESSAGE;

  // Retry authentication by navigating to the login page
  const handleRetry = () => navigate("/login", { replace: true });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Alert variant="outlined" severity="error">
          <AlertTitle className="text-lg font-semibold mb-2">
            Authentication Error
          </AlertTitle>
          <p className="mb-4">{errorMessage}</p>
          <Button onClick={handleRetry} variant="outlined" className="w-full">
            Try Again
          </Button>
        </Alert>
      </div>
    </div>
  );
};

export default AuthError;
