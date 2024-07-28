import React from "react";
import { Box, Typography, Divider, Fade } from "@mui/material";
import { formatExplanation } from "../../utils/formatters";

interface EvaluationDisplayProps {
  evaluation: string;
  goodDescription: string;
  isMobile: boolean;
  isTablet: boolean;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({
  evaluation,
  goodDescription,
  isMobile,
  isTablet,
}) => {
  // Content styles for evaluation and model description content
  const contentStyles = {
    pl: isMobile ? 1 : 2,
    borderLeft: "4px solid",
    py: isMobile ? 0.5 : 1,
  };

  // Title styles for evaluation and model description titles
  const titleStyles = {
    fontWeight: "bold",
    mb: isMobile ? 0.5 : 1,
    fontSize: isMobile ? "1rem" : isTablet ? "1.15rem" : "1.25rem",
  };

  return (
    <Fade in={!!(evaluation || goodDescription)} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          maxHeight: isMobile ? "40vh" : isTablet ? "50vh" : "60vh",
        }}
      >
        {evaluation && (
          <Box sx={{ mb: isMobile ? 2 : 3 }}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                ...titleStyles,
                color: "info.main",
              }}
            >
              Evaluation:
            </Typography>
            <Box
              sx={{
                ...contentStyles,
                borderColor: "info.main",
              }}
            >
              {formatExplanation(evaluation)}
            </Box>
          </Box>
        )}
        {goodDescription && (
          <>
            <Divider sx={{ my: isMobile ? 2 : 3 }} />
            <Box>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  ...titleStyles,
                  color: "success.main",
                }}
              >
                Model Description:
              </Typography>
              <Box
                sx={{
                  ...contentStyles,
                  borderColor: "success.main",
                }}
              >
                {formatExplanation(goodDescription)}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default EvaluationDisplay;
