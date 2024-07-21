import React from "react";
import { Box, Typography, Divider, Fade } from "@mui/material";
import { formatExplanation } from "../../utils/formatters";

interface EvaluationDisplayProps {
  evaluation: string;
  goodDescription: string;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({
  evaluation,
  goodDescription,
}) => (
  <Fade in={!!(evaluation || goodDescription)} timeout={1000}>
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      {evaluation && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "info.main",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Evaluation:
          </Typography>
          <Box
            sx={{
              pl: 2,
              borderLeft: "4px solid",
              borderColor: "info.main",
              py: 1,
            }}
          >
            {formatExplanation(evaluation)}
          </Box>
        </Box>
      )}
      {goodDescription && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "success.main",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Model Description:
            </Typography>
            <Box
              sx={{
                pl: 2,
                borderLeft: "4px solid",
                borderColor: "success.main",
                py: 1,
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

export default EvaluationDisplay;
