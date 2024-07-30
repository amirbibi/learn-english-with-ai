import React, { useCallback, useState } from "react";
import { Button, Stack, Snackbar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface SpeechToTextProps {
  onTranscriptUpdate: (transcript: string) => void;
  isDisabled: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
  onTranscriptUpdate,
  isDisabled,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleStartListening = useCallback(() => {
    setError(null);
    SpeechRecognition.startListening({ continuous: true }).catch(() => {
      setError("Failed to start speech recognition. Please try again.");
    });
  }, []);

  const handleStopListening = useCallback(() => {
    SpeechRecognition.stopListening();
    onTranscriptUpdate(transcript);
  }, [onTranscriptUpdate, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<MicIcon />}
          onClick={handleStartListening}
          disabled={listening || isDisabled}
        >
          Start Listening
        </Button>
        <Button
          variant="outlined"
          startIcon={<MicOffIcon />}
          onClick={handleStopListening}
          disabled={!listening || isDisabled}
        >
          Stop Listening
        </Button>
      </Stack>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </>
  );
};

export default SpeechToText;
