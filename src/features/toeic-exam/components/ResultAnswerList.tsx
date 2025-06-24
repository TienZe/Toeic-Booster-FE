import { Box, Typography } from "@mui/material";
import ResultAnswerItem from "./ResultAnswerItem";

interface ResultAnswerListProps {
  label: string;
  questions: {
    id: number;
    correctAnswer: string;
    userChoice?: string;
    questionNumber: number;
  }[];
}
const ResultAnswerList: React.FC<ResultAnswerListProps> = ({
  label,
  questions,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {label}
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr 1fr" }}
        gap={2}
      >
        {questions.map((question) => (
          <ResultAnswerItem
            questionNumber={question.questionNumber}
            correctAnswer={question.correctAnswer}
            userChoice={question.userChoice}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ResultAnswerList;
