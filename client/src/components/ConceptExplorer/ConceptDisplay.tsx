import React from "react";
import { Box, Typography, IconButton, Tooltip, Skeleton } from "@mui/material";
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
        justifyContent: "space-between",
        mb: 3,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {isLoading ? (
        <Skeleton variant="text" width="80%" height={40} />
      ) : (
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "secondary.main",
            wordBreak: "break-word",
            flexGrow: 1,
          }}
        >
          Concept: {concept}
        </Typography>
      )}
      {!isSubmitted && (
        <Tooltip title="Get new concept">
          <span>
            <IconButton
              onClick={onRefresh}
              size="small"
              aria-label="get new concept"
              sx={{
                color: "secondary.main",
              }}
              disabled={isLoading}
            >
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Box>
  );
};

export default ConceptDisplay;
