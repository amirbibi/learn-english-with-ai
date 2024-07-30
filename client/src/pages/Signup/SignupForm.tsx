import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PasswordField from "../../components/ui/form/PasswordField";
import ErrorMessage from "../../components/ui/ErrorMessage";
import React from "react";
import ContinueWithGoogleButton from "../../components/ui/form/ContinueWithGoogleButton";

interface SignupFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  error: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validationErrors: Partial<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  isLoading,
  error,
  handleChange,
  handleSubmit,
  validationErrors,
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
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
      <PasswordField
        autoComplete="new-password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
      />
      <PasswordField
        name="confirmPassword"
        label="Confirm Password"
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
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
      {error && <ErrorMessage message={error} title="Signup Error" />}
      <Divider sx={{ my: 2 }}>OR</Divider>
      <ContinueWithGoogleButton />
      <Typography align="center">
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
