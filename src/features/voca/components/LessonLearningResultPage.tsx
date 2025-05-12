import { Box, Grid2, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ResultItem from "./ResultItem";
import PassResultSvg from "../assets/pass-result.svg";
import TimeResultSvg from "../assets/time-result.svg";
import ResultHistoryBarChart from "./ResultHistoryBarChart";
import { VocabularyCardState } from "../../../components/VocabularyCard";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getLessonPracticeStatistics } from "../api/voca-learning";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import ListWords from "./ListWords";
import useLesson from "../../../hooks/useLesson";

const PIE_COLORS = ["#32CD32", "#E5E5E5"]; // Green and Grey

const LessonLearningResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");
  const vocaSetId = searchParams.get("vocaSetId");

  const { data: learningResult, isLoading } = useQuery({
    queryKey: ["lesson-learning-result", { lessonId: lessonId }],
    queryFn: () => getLessonPracticeStatistics(lessonId!),
    enabled: !!lessonId,
  });

  const { data: lesson } = useLesson(lessonId!, {
    enabled: !!lessonId,
  });

  const lessonName = lesson?.name;

  const currentResult = learningResult?.current;
  const accuracy = currentResult
    ? (currentResult.numCorrect / currentResult.totalWords) * 100
    : 0;

  const pieChartData = currentResult
    ? [
        {
          name: "Correct",
          value: accuracy,
        },
        {
          name: "Incorrect",
          value: 100 - accuracy,
        },
      ]
    : [];

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading && <CustomBackdrop open />}
      <Stack sx={{ minHeight: "100vh" }}>
        <LessonHeader
          title="result"
          lessonName={lessonName}
          containerSx={{ maxWidth: "1070px" }}
          onExit={() =>
            navigate(vocaSetId ? `/voca/${vocaSetId}/lessons` : "/")
          }
        />
        <LessonMainContent sx={{ py: "50px", maxWidth: "1070px" }}>
          <Typography variant="h4" sx={{ fontSize: "30px" }}>
            Result evaluation table
          </Typography>
          <Grid2
            container
            columns={10}
            spacing="30px"
            sx={{
              marginTop: "35px",
              marginBottom: 4,
              "& .MuiGrid2-root": {
                border: "2px solid #e5e5e5",
                borderRadius: "22px",
                backgroundColor: "#F8FAFB",
              },
            }}
          >
            <Grid2 size={4}>
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Typography sx={{ fontSize: "20px", color: "#777777" }}>
                  Test results
                </Typography>

                {/* Pie chart */}
                <Box sx={{ position: "relative" }}>
                  <ResponsiveContainer width="100%" height={330}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" // Center X position
                        cy="50%" // Center Y position
                        innerRadius={100} // Inner radius for the doughnut effect
                        outerRadius={140} // Outer radius for the pie
                        cornerRadius={8}
                        startAngle={0}
                        endAngle={-360}
                      >
                        {pieChartData.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "46px",
                      color: "#58CC02",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {accuracy.toFixed(0)}%
                  </Typography>
                </Box>

                {/* Legend */}
                <Stack spacing="25px" sx={{ marginTop: 1 }}>
                  <ResultItem
                    title="Retained words"
                    value={`${currentResult?.numCorrect} words`}
                    icon={PassResultSvg}
                    iconSize={37}
                  />
                  <ResultItem
                    title="Time"
                    value={`${currentResult?.duration} seconds`}
                    icon={TimeResultSvg}
                  />
                </Stack>
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Typography sx={{ fontSize: "20px", color: "#777777" }}>
                  Progress chart
                </Typography>
                <Box
                  sx={{
                    my: "25px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "20px 25px 20px 35px",
                  }}
                >
                  <ResultHistoryBarChart
                    data={{
                      best: learningResult?.best.numCorrect || 0,
                      mostRecent:
                        learningResult?.mostRecent.numCorrect ||
                        currentResult?.numCorrect ||
                        0,
                      current: currentResult?.numCorrect || 0,
                    }}
                    totalWord={currentResult?.totalWords || 0}
                  />
                </Box>
              </Box>
            </Grid2>
          </Grid2>
          <Typography variant="h4" sx={{ fontSize: "30px" }}>
            Detailed results
          </Typography>

          <ListWords
            status={VocabularyCardState.ERROR}
            title="Unfamiliar words"
            vocabularies={currentResult?.incorrectWords || []}
            sx={{ marginTop: 2 }}
          />
          <ListWords
            status={VocabularyCardState.SUCCESS}
            title="Words you know well"
            vocabularies={currentResult?.correctWords || []}
            sx={{ marginTop: 2 }}
          />
        </LessonMainContent>
      </Stack>
    </>
  );
};

export default LessonLearningResultPage;
