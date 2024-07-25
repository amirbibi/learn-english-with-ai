import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthError: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get error message from URL query params, if any
  const params = new URLSearchParams(location.search);
  const errorMessage =
    params.get("message") || "An error occurred during authentication.";

  const handleRetry = () => {
    // Redirect to the login page or home page
    navigate("/login");
  };

  return (
    <div className="auth-error-container">
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <button onClick={handleRetry}>Try Again</button>
    </div>
  );
};

export default AuthError;
