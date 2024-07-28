import React from "react";
import {
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  isLoading,
  isMobile,
  isTablet,
}) => {
  // Handle clearing the description input when submitting
  const handleClear = () => {
    onChange("");
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant={isMobile ? "body1" : "subtitle1"}
        sx={{
          mb: 1,
          fontWeight: "medium",
          fontSize: isMobile ? "0.9rem" : "1rem",
        }}
      >
        Your Description:
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={isMobile ? 3 : isTablet ? 4 : 5}
        variant="outlined"
        placeholder="Describe the concept in your own words..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        InputProps={{
          endAdornment:
            value && !isLoading ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear description"
                  onClick={handleClear}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        sx={(theme) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: isMobile ? 1 : 2,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: isMobile ? "0.9rem" : "1rem",
          },
        })}
      />
    </Box>
  );
};

export default DescriptionInput;
