import { Chip } from "@mui/material";
import { DIFFICULTY_COLORS } from "../../../../lib/constants";

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
