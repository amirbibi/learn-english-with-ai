import { Button, ButtonGroup } from "@mui/material";
import { useEffect } from "react";

const DIFFICULTIES = [
  { name: "easy", color: "#00b8a3" },
  { name: "medium", color: "#e6a417" },
  { name: "hard", color: "#ff375f" },
];

interface DifficultiesButtonGroupProps {
  isLoading: boolean;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  onSelectDifficulty: (difficulty: string) => void;
}

const DifficultiesButtonGroup: React.FC<DifficultiesButtonGroupProps> = ({
  isLoading,
  selectedDifficulty,
  setSelectedDifficulty,
  onSelectDifficulty,
}) => {
  const handleDifficultyChange = (difficulty: string) => {
    if (selectedDifficulty === difficulty) return;

    setSelectedDifficulty(difficulty);
    onSelectDifficulty(difficulty);
  };

  return (
    <ButtonGroup fullWidth variant="contained" disabled={isLoading}>
      {DIFFICULTIES.map(({ name, color }) => (
        <Button
          key={name}
          onClick={() => handleDifficultyChange(name)}
          sx={{
            backgroundColor: color,
            color: "white",
            fontWeight: "bold",
            overflow: "hidden",
            borderColor: "white",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: color,
              opacity: 0.8,
            },
            // Conditional styling for selected difficulty
            ...(selectedDifficulty === name && {
              boxShadow: `inset 0 0 0 3px white, 0 0 0 3px ${color}`,
              transform: "scale(1.08)",
              zIndex: 1,
            }),
          }}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DifficultiesButtonGroup;
