import { Alert, AlertTitle, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorMessageProps {
  message: string;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title = "" }) => (
  <Alert
    severity="error"
    variant="outlined"
    icon={<ErrorOutlineIcon />}
    sx={{
      mb: 2,
      width: "100%",
      "& .MuiAlert-message": {
        width: "100%",
      },
    }}
  >
    <AlertTitle>{title}</AlertTitle>
    <Typography variant="body2">{message}</Typography>
  </Alert>
);

export default ErrorMessage;
