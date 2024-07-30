import React from "react";
import { Box, Typography, Divider, Fade } from "@mui/material";
import { formatExplanation } from "../../utils/formatters";

interface EvaluationDisplayProps {
  evaluation: string;
  goodDescription: string;
  isSubmitted: boolean;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({
  evaluation,
  goodDescription,
  isSubmitted,
}) => {
  return (
    <Fade in={isSubmitted} timeout={1000}>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: "info.main" }}>
            Evaluation:
          </Typography>
          <Box
            sx={{ pl: 2, borderLeft: "4px solid", borderColor: "info.main" }}
          >
            {formatExplanation(evaluation)}
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" sx={{ mb: 1, color: "success.main" }}>
            Model Description:
          </Typography>
          <Box
            sx={{ pl: 2, borderLeft: "4px solid", borderColor: "success.main" }}
          >
            {formatExplanation(goodDescription)}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default EvaluationDisplay;
