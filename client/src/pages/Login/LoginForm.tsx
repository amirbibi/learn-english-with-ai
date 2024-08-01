import { Box, Button, Divider, Link, Typography } from "@mui/material";
import FormTextField from "../../components/ui/form/FormTextField";
import PasswordField from "../../components/ui/form/PasswordField";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Link as RouterLink } from "react-router-dom";
import ContinueWithGoogleButton from "../../components/ui/form/ContinueWithGoogleButton";

interface LoginFormProps {
  formData: { email: string; password: string };
  isLoading: boolean;
  error: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  isLoading,
  error,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <FormTextField
        autoFocus
        value={formData.email}
        onChange={handleChange}
        name="email"
        label="Email Address"
      />
      <PasswordField
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Sign In"}
      </Button>
      {error && <ErrorMessage message={error} title="Login Error" />}
      <Divider sx={{ my: 2 }}>OR</Divider>
      <ContinueWithGoogleButton />
      <Typography align="center">
        <Link component={RouterLink} to="/signup" variant="body2">
          Don't have an account? Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
