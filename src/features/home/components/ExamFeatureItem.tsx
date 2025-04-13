import { Stack, Typography } from "@mui/material";
import React from "react";

interface ExamFeatureItemProps {
  feature: string;
  details: string;
  cardImage: string;
}
const ExamFeatureItem: React.FC<ExamFeatureItemProps> = ({
  feature,
  details,
  cardImage,
}) => {
  return (
    <Stack
      spacing={1.5}
      alignItems="center"
      sx={{ maxWidth: "360px", padding: 1 }}
    >
      <img src={cardImage} style={{ width: 60, height: 60 }} />
      <Stack spacing={1}>
        <Typography variant="h5" color="secondary.dark" textAlign="center">
          {feature}
        </Typography>
        <Typography textAlign="center">{details}</Typography>
      </Stack>
    </Stack>
  );
};

export default ExamFeatureItem;
