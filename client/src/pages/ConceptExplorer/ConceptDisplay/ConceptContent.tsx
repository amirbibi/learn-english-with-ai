import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import DifficultyChip from "./DifficultyChip";

interface ConceptContentProps {
  concept: string;
  category: string;
  difficulty: string;
  isSubmitted: boolean;
}

export const ConceptContent: React.FC<ConceptContentProps> = ({
  concept,
  category,
  difficulty,
  isSubmitted,
}) => (
  <>
    {!isSubmitted && (
      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: "common.white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          fontSize: { xs: "1.4rem", sm: "1.55rem" },
        }}
      >
        Explain the concept...
      </Typography>
    )}
    <Typography
      variant="h3"
      component="div"
      align="center"
      sx={{
        mb: 2,
        fontWeight: "bold",
        color: "common.white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        fontSize: { xs: "1.8rem", sm: "3rem" },
      }}
    >
      {concept} 🧠
    </Typography>
    <Box sx={{ display: "flex", gap: 1 }}>
      <Chip
        label={category}
        sx={{
          bgcolor: "rgba(255,255,255,0.9)",
          color: "#00695c",
          fontWeight: "bold",
        }}
      />
      <DifficultyChip difficulty={difficulty} />
    </Box>
  </>
);
