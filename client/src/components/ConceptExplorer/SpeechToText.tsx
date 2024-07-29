import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, Stack, Snackbar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface SpeechToTextProps {
  onTranscriptUpdate: (transcript: string) => void;
  isSubmitted: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
  onTranscriptUpdate,
  isSubmitted,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    onTranscriptUpdate(transcript);
  }, [transcript, onTranscriptUpdate]);

  const handleStartListening = useCallback(() => {
    setError(null);
    SpeechRecognition.startListening({ continuous: true }).catch((err) => {
      setError("Failed to start speech recognition. Please try again.");
      console.error("Speech recognition error:", err);
    });
  }, []);

  const handleStopListening = useCallback(() => {
    console.log(transcript);
    SpeechRecognition.stopListening();
    onTranscriptUpdate(transcript);
  }, [onTranscriptUpdate, transcript]);

  useEffect(() => {
    if (isSubmitted && listening) {
      handleStopListening();
    }
  }, [handleStopListening, isSubmitted, listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Typography variant="h6" color="error">
        Browser doesn't support speech recognition.
      </Typography>
    );
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<MicIcon />}
          onClick={handleStartListening}
          disabled={listening}
        >
          Start Listening
        </Button>
        <Button
          variant="outlined"
          startIcon={<MicOffIcon />}
          onClick={handleStopListening}
          disabled={!listening}
        >
          Stop Listening
        </Button>
      </Stack>
      {listening && (
        <Typography variant="h6" color="primary" mb={2}>
          Listening...
        </Typography>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};

export default SpeechToText;
