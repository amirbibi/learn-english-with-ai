import React from "react";
import { TextField, Box } from "@mui/material";
import SpeechToText from "./SpeechToText";
import PageSubTitle from "../../../components/ui/PageSubTitle";

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
      <PageSubTitle subtitle="Your Description:" color="primary.main" />
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Describe the concept in your own words..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        sx={{ mt: 1 }}
      />
      <Box mt={2}>
        <SpeechToText
          onTranscriptUpdate={onChange}
          isDisabled={isLoading}
          isSubmitted={isSubmitted}
        />
      </Box>
    </Box>
  );
};

export default DescriptionInput;
