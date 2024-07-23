import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Link,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useUserContext } from "../../hooks/useUserContext";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useUserContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (validationErrors[name as keyof FormData]) {
      setValidationErrors((prevvalidationErrors) => ({
        ...prevvalidationErrors,
        [name]: "",
      }));
    }
  };

  const handleGoogleSignup = () => {
    // window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, "_self");
    console.log("Attempting to sign up with Google");
  };

  const validateForm = (): boolean => {
    const newvalidationErrors: Partial<FormData> = {};
    if (!formData.email) {
      newvalidationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newvalidationErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newvalidationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newvalidationErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newvalidationErrors.confirmPassword = "Passwords do not match";
    }
    setValidationErrors(newvalidationErrors);
    return Object.keys(newvalidationErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      setError(null);
      try {
        const success = await register(formData.email, formData.password);
        if (success) {
          navigate("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          py: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[10],
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 3, textAlign: "center", fontWeight: 700 }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!validationErrors.confirmPassword}
                helperText={validationErrors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign Up"}
              </Button>
              {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              <Divider sx={{ my: 2 }}>OR</Divider>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignup}
                sx={{ mt: 1, mb: 2 }}
              >
                Continue with Google
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Signup;
