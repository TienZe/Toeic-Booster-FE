import { Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { resetNotedQuestion } from "../../../stores/notedQuestionSlice";
import UserToeicInfoLayout from "../../../components/layout/toeic/UserToeicInfoLayout";
import {
  AccessTime,
  Cancel,
  Check,
  CheckCircle,
  Flag,
  RemoveCircle,
  TrendingUp,
} from "@mui/icons-material";
import ResultStatsItem from "./ResultStatsItem";
import ResultScoreBox from "./ResultScoreBox";
import Link from "../../../components/UI/Link";
import TOEICChatbotPage from "./Chatbot/ToeicChatBot";
import { useAttemptDetails } from "../../../hooks/useAttemptDetails";
import { secondToHHMMSS } from "../../../utils/helper";
import { useParams } from "react-router-dom";
import ResultAnswerList from "./ResultAnswerList";
import {
  getDisplayedPart,
  splitQuestionGroupsToParts,
} from "../../../utils/toeicExamHelper";
import { Part } from "../../../types/ToeicExam";

const ResultPage = () => {
  const dispatch = useDispatch();
  const routeParams = useParams<{ attemptId: string }>();
  const attemptId = routeParams.attemptId;

  const { isLoading: isLoadingAttemptDetails, data: attemptDetails } =
    useAttemptDetails(
      attemptId!,
      {
        enabled: !!attemptId,
      },
      {
        withResultSummary: 1,
      },
    );

  const totalQuestions = attemptDetails?.totalQuestions || 0;
  const numOfCorrectAnswers = attemptDetails?.numOfCorrectAnswers || 0;
  const numOfIncorrectAnswers = attemptDetails?.numOfIncorrectAnswers || 0;
  const numSkippedQuestions =
    totalQuestions - numOfCorrectAnswers - numOfIncorrectAnswers;
  const accuracy = (
    (numOfCorrectAnswers / (numOfCorrectAnswers + numOfIncorrectAnswers)) *
    100
  ).toFixed(2);

  const isFullTest = attemptDetails?.isFullTest;

  const selectedParts = useMemo(
    () => (attemptDetails?.selectedParts || []) as Part[],
    [attemptDetails?.selectedParts],
  );

  const part2QuestionGroups = useMemo(() => {
    return splitQuestionGroupsToParts(
      attemptDetails?.toeicTest?.questionGroups || [],
      selectedParts,
    );
  }, [attemptDetails?.toeicTest?.questionGroups, selectedParts]);

  useEffect(() => {
    dispatch(resetNotedQuestion());
  }, []);

  return (
    <UserToeicInfoLayout grayBackground>
      <Box
        sx={{
          padding: 3,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          marginBottom: 2,
          backgroundColor: "white",
        }}
      >
        {/* Header */}
        <Typography variant="h4" sx={{ mb: 1 }}>
          Exam Results: {attemptDetails?.toeicTest?.name}
        </Typography>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="start">
          <Button
            variant="contained"
            sx={{ boxShadow: "none" }}
            onClick={() => {
              document
                .getElementById("result-answers")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View answers
          </Button>
          <Link to={`/exams/${attemptDetails?.toeicTest?.id}`}>
            <Button variant="outlined">Back to test page</Button>
          </Link>
        </Stack>

        {/* Result Summary */}
        <Grid2 container spacing={1}>
          {/* Left Summary Panel */}
          <Grid2 size={{ md: 12, lg: 3 }}>
            <Paper
              sx={{
                borderRadius: "10px",
                backgroundColor: "background.paper",
                border: "1px solid #efefef",
                py: 1.5,
                px: 1,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,.05)",
              }}
            >
              <Stack spacing={1}>
                {/* Completion Status */}
                <ResultStatsItem
                  icon={<Check sx={{ color: "#27ae60", fontSize: "20px" }} />}
                  title="Test result"
                  value={`${numOfCorrectAnswers}/${totalQuestions}`}
                />

                {/* Accuracy */}
                <ResultStatsItem
                  icon={
                    <TrendingUp sx={{ color: "#f39c12", fontSize: "20px" }} />
                  }
                  title="Accuracy (#correct/#total)"
                  value={`${accuracy}%`}
                />

                {/* Time */}
                <ResultStatsItem
                  icon={
                    <AccessTime sx={{ color: "#3498db", fontSize: "20px" }} />
                  }
                  title="Time taken"
                  value={secondToHHMMSS(attemptDetails?.takenTime || 0)}
                />
              </Stack>
            </Paper>
          </Grid2>

          {/* Right Results Panel */}
          <Grid2 size={9}>
            {/* Result Cards */}
            <Grid2 container spacing={1} sx={{ mb: 1, flexGrow: 1 }}>
              {/* Correct Answers */}
              <Grid2 size="grow">
                <ResultScoreBox
                  icon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "success.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  }
                  label="Correct"
                  labelSx={{
                    color: "success.main",
                  }}
                  value={numOfCorrectAnswers}
                  unit="questions"
                />
              </Grid2>

              {/* Wrong Answers */}
              <Grid2 size="grow">
                <ResultScoreBox
                  icon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "error.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Cancel sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  }
                  label="Wrong"
                  labelSx={{
                    color: "error.main",
                  }}
                  value={numOfIncorrectAnswers}
                  unit="questions"
                />
              </Grid2>

              {/* Skipped */}
              <Grid2 size="grow">
                <ResultScoreBox
                  icon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "#9e9e9e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RemoveCircle sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  }
                  label="Skipped"
                  labelSx={{
                    color: "#9e9e9e",
                  }}
                  value={numSkippedQuestions}
                  unit="questions"
                />
              </Grid2>

              {/* Score */}
              <Grid2 size="grow" sx={{ display: isFullTest ? "flex" : "none" }}>
                <ResultScoreBox
                  icon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1.5,
                      }}
                    >
                      <Flag sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  }
                  label="Score"
                  labelSx={{
                    color: "primary.main",
                  }}
                  value={attemptDetails?.score || 0}
                />
              </Grid2>
            </Grid2>

            {/* Skills Section */}
            <Grid2
              container
              spacing={1}
              sx={{ display: isFullTest ? "flex" : "none" }}
            >
              {/* Listening */}
              <Grid2 size={6}>
                <ResultScoreBox
                  label="Listening"
                  value={`${attemptDetails?.listeningScore}/495`}
                  unit={`Answered correctly ${attemptDetails?.numCorrectLcQuestions}/100`}
                  labelSx={{
                    color: "primary.main",
                  }}
                />
              </Grid2>

              {/* Reading */}
              <Grid2 size={6}>
                <ResultScoreBox
                  label="Reading"
                  value={`${attemptDetails?.readingScore}/495`}
                  unit={`Answered correctly ${attemptDetails?.numCorrectRcQuestions}/100`}
                  labelSx={{
                    color: "primary.main",
                  }}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="h5" id="result-answers">
            Answers
          </Typography>
          <Link to={`/exams/review/${attemptId}`}>
            <Button variant="text">View detailed answers</Button>
          </Link>
        </Stack>

        <Stack gap={2} sx={{ mt: 2 }}>
          {selectedParts.map((part) => {
            const questions = part2QuestionGroups[part]
              .map((questionGroup) => questionGroup.questions)
              .flat();

            return (
              <ResultAnswerList
                label={getDisplayedPart(part)}
                questions={questions.map((question) => ({
                  id: question.id,
                  correctAnswer:
                    question.userAnswer?.correctAnswer ||
                    question.correctAnswer,
                  userChoice: question.userAnswer?.choice,
                  questionNumber: question.questionNumber,
                }))}
              />
            );
          })}
        </Stack>
      </Box>
      <TOEICChatbotPage />
    </UserToeicInfoLayout>
  );
};

export default ResultPage;
