import React from "react";
import { Box, Typography, Divider, Fade } from "@mui/material";
import { formatSection } from "../../utils/formatters";

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
          <Typography
            variant="h6"
            sx={{ mt: 2, mb: 1, color: "info.main", fontWeight: "bold" }}
          >
            Evaluation:
          </Typography>
          <Box
            sx={{
              pl: 2,
              borderLeft: "4px solid",
              borderColor: "info.main",
            }}
          >
            {formatSection(evaluation)}
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography
            variant="h6"
            sx={{ mb: 1, color: "success.main", fontWeight: "bold" }}
          >
            Model Description:
          </Typography>
          <Box
            sx={{ pl: 2, borderLeft: "4px solid", borderColor: "success.main" }}
          >
            {formatSection(goodDescription)}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default EvaluationDisplay;
