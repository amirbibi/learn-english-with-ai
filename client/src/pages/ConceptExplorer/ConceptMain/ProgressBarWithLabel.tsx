import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ProgressBarWithLabel = () => {
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressBarValue((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 0.5;
      });
    }, 40);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progressBarValue}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      <Typography variant="body2">{`${Math.round(
        progressBarValue
      )}%`}</Typography>
    </Box>
  );
};

export default ProgressBarWithLabel;
