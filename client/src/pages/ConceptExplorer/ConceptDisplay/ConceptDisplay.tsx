import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, Fade } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ConceptSkeleton } from "./ConceptSkeleton";
import { ConceptContent } from "./ConceptContent";

interface ConceptDisplayProps {
  concept: string;
  category: string;
  difficulty: string;
  isSubmitted: boolean;
  isLoading: boolean;
  onRefresh: (difficulty: string, category: string) => void;
}

const ConceptDisplay: React.FC<ConceptDisplayProps> = ({
  concept,
  category,
  difficulty,
  isSubmitted,
  isLoading,
  onRefresh,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (concept) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [isLoading, concept]);

  const handleRefresh = () => {
    setShowContent(false);

    // Timeout for the fade animation
    setTimeout(() => {
      onRefresh(category, difficulty);
    }, 300);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 2,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(45deg, #009688, #00796b)",
      }}
    >
      <Fade in={showContent} timeout={300}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showContent ? (
            <ConceptContent
              concept={concept}
              category={category}
              difficulty={difficulty}
            />
          ) : (
            <ConceptSkeleton />
          )}
        </Box>
      </Fade>
      {!isSubmitted && !isLoading && (
        <IconButton
          onClick={handleRefresh}
          disabled={isLoading}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.3)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.5)",
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default ConceptDisplay;
