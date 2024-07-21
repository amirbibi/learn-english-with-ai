import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

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
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        mb: 3,
        borderRadius: 2,
        color: "background.paper",
        py: 1.5,
        px: 4,
        fontWeight: "bold",
      }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : isSubmitted ? (
        "Generate New Concept"
      ) : (
        "Submit Description"
      )}
    </Button>
  </motion.div>
);

export default SubmitButton;
