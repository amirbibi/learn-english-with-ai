import React, { useCallback } from "react";
import { TextField, Typography, Box } from "@mui/material";
import SpeechToText from "./SpeechToText";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSubmitted: boolean;
  displayStyle: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  isLoading,
  isMobile,
  isTablet,
  isSubmitted,
  displayStyle,
}) => {
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      // TODO: Change the transcript to the value of the input field in the SpeechToText component child component
    },
    [onChange]
  );

  const updateTranscript = useCallback(
    (transcript: string) => {
      onChange(transcript);
    },
    [onChange]
  );

  return (
    <Box sx={{ mb: 3, display: displayStyle }}>
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
        onChange={handleTextChange}
        disabled={isLoading}
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
      <Box mt={2}>
        <SpeechToText
          onTranscriptUpdate={updateTranscript}
          isSubmitted={isSubmitted}
        />
      </Box>
    </Box>
  );
};

export default DescriptionInput;
