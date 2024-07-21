import React from "react";
import { Typography } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Typography color="error" sx={{ mb: 2 }}>
    {message}
  </Typography>
);

export default ErrorMessage;
