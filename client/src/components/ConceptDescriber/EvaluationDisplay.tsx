import React from "react";
import { Box, Typography } from "@mui/material";
import { formatExplanation } from "../../utils/formatters";

interface EvaluationDisplayProps {
  evaluation: string;
  goodDescription: string;
  isMobile: boolean;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({
  evaluation,
  goodDescription,
  isMobile,
}) => (
  <Box sx={{ flexGrow: 1, overflow: "auto" }}>
    {evaluation && (
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: "info.main",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Evaluation:
        </Typography>
        <Box sx={{ pl: 2 }}>{formatExplanation(evaluation)}</Box>
      </Box>
    )}
    {goodDescription && (
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "success.main",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Good Description:
        </Typography>
        <Box sx={{ pl: 2 }}>{formatExplanation(goodDescription)}</Box>
      </Box>
    )}
  </Box>
);

export default EvaluationDisplay;
