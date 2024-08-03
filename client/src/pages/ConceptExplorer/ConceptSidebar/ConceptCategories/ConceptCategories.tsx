import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PageTitle from "../../../../components/ui/PageTitle";
import DifficultiesButtonGroup from "./DifficultiesButtonGroup";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_DIFFICULTY,
} from "../../../../lib/constants";

interface ConceptCategoriesProps {
  isLoading: boolean;
  onSelectConcept: (category: string, difficulty: string) => void;
  currentCategory: string;
  currentDifficulty: string;
}

const ConceptCategories: React.FC<ConceptCategoriesProps> = ({
  isLoading,
  onSelectConcept,
  currentCategory,
  currentDifficulty,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    currentDifficulty || DEFAULT_DIFFICULTY
  );

  const [selectedCategory, setSelectedCategory] = useState(
    currentCategory || DEFAULT_CATEGORIES[0]
  );

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
        <DifficultiesButtonGroup
          isLoading={isLoading}
          onSelectDifficulty={handleDifficultyChange}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />
      </Box>
    </Box>
  );
};

export default ConceptCategories;
