import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import SpeechToText from "./SpeechToText";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  isSubmitted: boolean;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  isLoading,
  isSubmitted,
}) => {
  return (
    <Box sx={{ mb: 3, display: isSubmitted ? "none" : "block" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
        Your Description:
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Describe the concept in your own words..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      />
      <Box mt={2}>
        <SpeechToText onTranscriptUpdate={onChange} isDisabled={isLoading} />
      </Box>
    </Box>
  );
};

export default DescriptionInput;
