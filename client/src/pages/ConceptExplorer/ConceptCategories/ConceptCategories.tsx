import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  ButtonGroup,
} from "@mui/material";
import PageTitle from "../../../components/ui/PageTitle";

const DIFFICULTIES = [
  { name: "easy", color: "#00b8a3" },
  { name: "medium", color: "#e6a417" },
  { name: "hard", color: "#ff375f" },
];

const DEFAULT_CATEGORIES = ["General", "Computer Science"];

interface ConceptCategoriesProps {
  isLoading: boolean;
  onSelectConcept: (category: string, difficulty: string) => void;
}

const ConceptCategories: React.FC<ConceptCategoriesProps> = ({
  isLoading,
  onSelectConcept,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    DEFAULT_CATEGORIES[0]
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    DIFFICULTIES[0].name
  );

  // useEffect(() => {
  //   onSelectConcept(selectedCategory, selectedDifficulty);
  // }, [onSelectConcept]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    onSelectConcept(event.target.value, selectedDifficulty);
  };

  const handleDifficultyChange = (difficulty: string) => {
    if (selectedDifficulty === difficulty) return;

    setSelectedDifficulty(difficulty);
    onSelectConcept(selectedCategory, difficulty);
  };

  return (
    <Box>
      <PageTitle title="Categories" align="left" />
      <FormControl fullWidth margin="normal" disabled={isLoading}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          {DEFAULT_CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        <ButtonGroup fullWidth variant="contained" disabled={isLoading}>
          {DIFFICULTIES.map(({ name, color }) => (
            <Button
              key={name}
              onClick={() => handleDifficultyChange(name)}
              sx={{
                backgroundColor: color,
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: color,
                  opacity: 0.8,
                },
              }}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default ConceptCategories;
