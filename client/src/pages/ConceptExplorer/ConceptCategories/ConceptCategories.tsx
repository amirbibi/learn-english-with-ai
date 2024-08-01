import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PageTitle from "../../../components/ui/PageTitle";
import DifficultiesButtonGroup from "./DifficultiesButtonGroup";

const DEFAULT_CATEGORIES = ["General", "Computer Science"];

interface ConceptCategoriesProps {
  isLoading: boolean;
  onSelectConcept: (category: string, difficulty: string) => void;
}

const ConceptCategories: React.FC<ConceptCategoriesProps> = ({
  isLoading,
  onSelectConcept,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const [selectedCategory, setSelectedCategory] = useState(
    DEFAULT_CATEGORIES[0]
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
