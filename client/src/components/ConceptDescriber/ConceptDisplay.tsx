import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ConceptDisplayProps {
  concept: string;
  isSubmitted: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

const ConceptDisplay: React.FC<ConceptDisplayProps> = ({
  concept,
  isSubmitted,
  isLoading,
  onRefresh,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 3,
      position: "relative",
      minHeight: "40px",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: "secondary.main",
        pr: isSubmitted ? 0 : 6,
        fontSize: { xs: "1rem", sm: "1.25rem" },
        wordBreak: "break-word",
      }}
    >
      Concept: {concept}
    </Typography>
    {!isSubmitted && (
      <IconButton
        onClick={onRefresh}
        size="small"
        aria-label="refresh concept"
        sx={{
          color: "secondary.main",
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        disabled={isLoading}
      >
        <RefreshIcon />
      </IconButton>
    )}
  </Box>
);

export default ConceptDisplay;
