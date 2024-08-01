import React from "react";
import { Box, Skeleton } from "@mui/material";

export const ConceptSkeleton: React.FC = () => (
  <Box sx={{ width: "100%" }}>
    <Skeleton variant="text" width="70%" height={36} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="90%" height={52} sx={{ mb: 2 }} />
    <Box sx={{ display: "flex", gap: 1 }}>
      <Skeleton variant="rounded" width={100} height={28} />
      <Skeleton variant="rounded" width={100} height={28} />
    </Box>
  </Box>
);
