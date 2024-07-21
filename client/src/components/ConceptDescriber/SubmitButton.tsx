import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface SubmitButtonProps {
  isSubmitted: boolean;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitted,
  isLoading,
  disabled,
  onClick,
}) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{ mb: 3, borderRadius: 2, color: "background.paper" }}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <CircularProgress size={24} color="inherit" />
    ) : isSubmitted ? (
      "Generate another concept"
    ) : (
      "Submit"
    )}
  </Button>
);

export default SubmitButton;
