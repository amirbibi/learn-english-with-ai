import { Chip } from "@mui/material";
import React from "react";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "#00b8a3",
  medium: "#e6a417",
  hard: "#ff375f",
};

interface DifficultyChipProps {
  difficulty: string;
}

const DifficultyChip: React.FC<DifficultyChipProps> = ({ difficulty }) => {
  const getColorForDifficulty = (difficulty: string): string => {
    return DIFFICULTY_COLORS[difficulty.toLowerCase()] || "#000000";
  };

  const color = getColorForDifficulty(difficulty);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <Chip
      label={capitalize(difficulty)}
      style={{
        backgroundColor: color,
        color: "#ffffff",
        fontWeight: "bold",
      }}
    />
  );
};

export default DifficultyChip;
