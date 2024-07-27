import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogin, isLoading } = useUserContext();

  useEffect(() => {
    const handleAuth = async () => {
      // Get authentication token from URL query params
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      // Redirect to error page if no token is provided
      if (!token) {
        navigate("/auth-error?message=No authentication token provided", {
          replace: true,
        });
        return;
      }

      // Otherwise, attempt to authenticate with the provided token
      try {
        const success = await googleLogin(token);
        if (success) {
          navigate("/", { replace: true });
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/auth-error?message=Authentication failed", {
          replace: true,
        });
      }
    };

    handleAuth();
  }, [location, navigate, googleLogin]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={60} />
        <Alert variant="outlined" severity="info" sx={{ mt: 2, maxWidth: 400 }}>
          <AlertTitle>Authenticating</AlertTitle>
          <Typography variant="body2">
            Please wait while we log you in...
          </Typography>
        </Alert>
      </Box>
    );
  }
};

export default AuthSuccess;
