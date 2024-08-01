import { Button, Box, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ui/ErrorMessage";

const DEFAULT_ERROR_MESSAGE = "An error occurred during authentication.";

const AuthError: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const errorMessage = params.get("message") || DEFAULT_ERROR_MESSAGE;

  const handleRetry = () => navigate("/login", { replace: true });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ErrorMessage message={errorMessage} title="Authentication Error" />
        <Button
          onClick={handleRetry}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthError;
