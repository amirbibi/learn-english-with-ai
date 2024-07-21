import React from "react";
import { TextField } from "@mui/material";

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
  <TextField
    fullWidth
    multiline
    rows={isMobile ? 3 : 4}
    variant="outlined"
    label="Your Description"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    sx={{ mb: 3 }}
    disabled={isLoading}
  />
);

export default DescriptionInput;
