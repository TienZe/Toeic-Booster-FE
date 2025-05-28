import { Check, Close } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

interface ResultAnswerItemProps {
  questionNumber: number;
  correctAnswer: string;
  userChoice?: string;
}

const ResultAnswerItem = ({
  questionNumber,
  correctAnswer,
  userChoice,
}: ResultAnswerItemProps) => {
  const isIncorrect = correctAnswer !== userChoice;
  const hasAnswered = Boolean(userChoice);

  const markIcon = useMemo(() => {
    if (!hasAnswered) {
      return null;
    }

    return isIncorrect ? (
      <Close color="error" sx={{ fontSize: "1rem" }} />
    ) : (
      <Check color="success" sx={{ fontSize: "1rem" }} />
    );
  }, [hasAnswered, isIncorrect]);

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Box
        sx={{
          width: 35,
          height: 35,
          borderRadius: "50%",
          backgroundColor: "primary.extraLight",
          color: "primary.main",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {questionNumber}
      </Box>
      <Typography>{correctAnswer}:</Typography>

      <Typography
        sx={{
          textDecoration:
            hasAnswered && isIncorrect ? "line-through" : "inherit",
        }}
        component="i"
      >
        {userChoice || <i style={{ fontStyle: "italic" }}>skipped</i>}
      </Typography>

      {markIcon}

      <Button
        variant="text"
        size="small"
        sx={{
          fontWeight: "400",
          "&:hover": {
            backgroundColor: "inherit",
          },
        }}
        disableRipple
      >
        [Detail]
      </Button>
    </Stack>
  );
};

export default ResultAnswerItem;
