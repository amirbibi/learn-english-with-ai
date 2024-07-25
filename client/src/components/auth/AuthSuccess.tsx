import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { Box, CircularProgress } from "@mui/material";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogin, isLoading } = useUserContext();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        const success = await googleLogin(token);
        if (success) {
          navigate("/");
        } else {
          navigate("/auth-error");
        }
      } else {
        navigate("/auth-error");
      }
    };

    handleAuth();
  }, [location, navigate, googleLogin]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
};

export default AuthSuccess;
