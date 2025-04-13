import { Box, Grid2, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ResultItem from "./ResultItem";
import PassResultSvg from "../assets/pass-result.svg";
import TimeResultSvg from "../assets/time-result.svg";
import { VocabularyCardState } from "../../../components/VocabularyCard";
import { Navigate, useNavigate } from "react-router-dom";
import ListWords from "./ListWords";
import { FolderPracticeState } from "../../../stores/folderPracticeSlice";
import { RootState } from "../../../stores";
import { useSelector } from "react-redux";
import BoldStrokeButton from "./BoldStrokeButton";

const PIE_COLORS = ["#32CD32", "#E5E5E5"]; // Green and Grey

const FolderPracticeResultPage = () => {
  const navigate = useNavigate();

  const { folder, correctVocaIds, takenTime } = useSelector<
    RootState,
    FolderPracticeState
  >((rootState) => rootState.folderPractice);

  const totalWords = folder?.words.length || 0;

  const accuracy = (correctVocaIds.length / totalWords) * 100;

  const pieChartData = [
    {
      name: "Correct",
      value: accuracy,
    },
    {
      name: "Incorrect",
      value: 100 - accuracy,
    },
  ];

  const correctWords =
    folder?.words.filter((voca) => correctVocaIds.includes(voca.id)) || [];
  const incorrectWords =
    folder?.words.filter((voca) => !correctVocaIds.includes(voca.id)) || [];

  if (!folder) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <LessonHeader
          title="result"
          lessonName={folder.name}
          containerSx={{ maxWidth: "1070px" }}
          onExit={() => navigate(`/personal-word-folder/${folder.id}`)}
        />
        <LessonMainContent sx={{ py: "50px", maxWidth: "1070px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" sx={{ fontSize: "30px" }}>
              Result evaluation table
            </Typography>
            <BoldStrokeButton
              variant="outlined"
              sx={{ maxWidth: "200px" }}
              onClick={() =>
                navigate(`/personal-word-folder/${folder.id}/practice`)
              }
            >
              CONTINUE PRACTICE
            </BoldStrokeButton>
          </Stack>
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
            <Grid2 size={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{
                  padding: "20px",
                }}
              >
                {/* Pie chart */}
                <Box sx={{ position: "relative" }}>
                  <ResponsiveContainer width={280} height={330}>
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
                <Stack
                  spacing="25px"
                  sx={{ marginTop: 1, width: "60%", maxWidth: "400px" }}
                >
                  <ResultItem
                    title="Retained words"
                    value={`${correctWords.length} words`}
                    icon={PassResultSvg}
                    iconSize={37}
                  />
                  <ResultItem
                    title="Time"
                    value={`${takenTime} seconds`}
                    icon={TimeResultSvg}
                  />
                </Stack>
              </Stack>
            </Grid2>
          </Grid2>
          <Typography variant="h4" sx={{ fontSize: "30px" }}>
            Detailed results
          </Typography>

          <ListWords
            status={VocabularyCardState.ERROR}
            title="Unfamiliar words"
            vocabularies={incorrectWords}
            sx={{ marginTop: 2 }}
          />
          <ListWords
            status={VocabularyCardState.SUCCESS}
            title="Words you know well"
            vocabularies={correctWords}
            sx={{ marginTop: 2 }}
          />
        </LessonMainContent>
      </Stack>
    </>
  );
};

export default FolderPracticeResultPage;
