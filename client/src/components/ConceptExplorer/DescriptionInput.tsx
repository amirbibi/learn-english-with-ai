import React from "react";
import { TextField, Typography, Box } from "@mui/material";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  isMobile: boolean;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  isLoading,
  isMobile,
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
      Your Description:
    </Typography>
    <TextField
      fullWidth
      multiline
      rows={isMobile ? 3 : 4}
      variant="outlined"
      placeholder="Describe the concept in your own words..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isLoading}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.4)",
          },
        },
      }}
    />
  </Box>
);

export default DescriptionInput;
