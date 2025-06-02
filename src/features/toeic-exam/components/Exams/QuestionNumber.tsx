import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";

interface QuestionNumberProps {
  question?: string;
  questionId: number;
  questionNumber: number;
  isNoted: boolean;
  isCorrectQuestion: boolean;

  onAssistant?: (questionId: number) => void;
  onClickQuestionNumber: () => void;
}

const QuestionNumber = React.forwardRef<HTMLDivElement, QuestionNumberProps>(
  (
    {
      question,
      questionNumber,
      questionId,
      isNoted,
      isCorrectQuestion,
      onAssistant,
      onClickQuestionNumber,
    },
    ref,
  ) => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        sx={{ mb: "15px" }}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <Box
            ref={ref}
            sx={{
              backgroundColor: isNoted
                ? "orange"
                : isCorrectQuestion === true
                  ? "#00B035"
                  : isCorrectQuestion === false
                    ? "#E20D2C"
                    : "primary.main",
              color: "white",
              fontWeight: "400",
              borderRadius: "50%",
              padding: "15px",
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={onClickQuestionNumber}
          >
            {questionNumber}
          </Box>
          {question && (
            <Typography sx={{ fontWeight: "500" }}>{question}</Typography>
          )}
        </Stack>
        {onAssistant && (
          <IconButton onClick={() => onAssistant(questionId)}>
            <Sparkles size={20} color="var(--color-primary-main)" />
          </IconButton>
        )}
      </Stack>
    );
  },
);

export default QuestionNumber;
