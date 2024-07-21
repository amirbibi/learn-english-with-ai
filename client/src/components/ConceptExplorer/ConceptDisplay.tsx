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
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          pr: isSubmitted ? 0 : 6,
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
          }}
          disabled={isLoading}
        >
          <RefreshIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ConceptDisplay;
