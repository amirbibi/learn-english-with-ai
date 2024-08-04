import { useCallback, useEffect, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ErrorMessage from "../../../../components/ui/ErrorMessage";

interface SpeechToTextProps {
  onTranscriptUpdate: (transcript: string) => void;
  isDisabled: boolean;
  isSubmitted: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
  onTranscriptUpdate,
  isDisabled,
  isSubmitted,
}) => {
  const [error, setError] = useState<string | null>(null);
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleStartListening = useCallback(() => {
    setError(null);
    SpeechRecognition.startListening({ continuous: true }).catch((err) => {
      console.error(err);
      setError("Failed to start speech recognition. Please try again.");
    });
  }, []);

  const handleStopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const handleTranscriptUpdate = useCallback(() => {
    onTranscriptUpdate(transcript);
  }, [onTranscriptUpdate, transcript]);

  useEffect(() => {
    if (listening) {
      handleTranscriptUpdate();
    } else {
      resetTranscript();
    }
  }, [handleTranscriptUpdate, listening, resetTranscript]);

  useEffect(() => {
    if (isSubmitted) {
      handleStopListening();
    }
  }, [isSubmitted, handleStopListening, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <Tooltip title={listening ? "Stop Listening" : "Start Listening"}>
        <IconButton
          color={listening ? "secondary" : "primary"}
          onClick={listening ? handleStopListening : handleStartListening}
          disabled={isDisabled}
          size="small"
        >
          {listening ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
      </Tooltip>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default SpeechToText;
