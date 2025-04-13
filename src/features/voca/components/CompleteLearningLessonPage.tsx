import { Box, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import FinishLearningImage from "../assets/learning-finish.svg";
import { Image } from "../../../components/UI/Image";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Link from "../../../components/UI/Link";
import BoldStrokeButton from "./BoldStrokeButton";

const CompleteLearningLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");
  const lessonName = searchParams.get("name");
  const vocaSetId = searchParams.get("vocaSetId");

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <LessonHeader
        title="finish"
        lessonName={lessonName || ""}
        onExit={() => navigate(vocaSetId ? `/voca/${vocaSetId}/lessons` : "/")}
      />
      <LessonMainContent
        sx={{
          paddingTop: "50px",
          maxWidth: "780px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack alignItems="center" sx={{ height: "100%", marginTop: -2 }}>
          <Image src={FinishLearningImage} sx={{ maxWidth: "320px" }} />
          <Box sx={{ paddingTop: "35px", textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", fontSize: "24px" }}
              color="#4C4C4C"
            >
              You have just completed the lesson
            </Typography>
            <Typography
              sx={{
                fontWeight: "medium",
                fontSize: "38px",
                marginTop: 1,
                textTransform: "uppercase",
              }}
              color="primary"
            >
              {lessonName}
            </Typography>
          </Box>
        </Stack>
      </LessonMainContent>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
          py: "26px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ maxWidth: "984px", mx: "auto" }}
        >
          <Link to={`/lesson/learn?id=${lessonId}`}>
            <BoldStrokeButton
              variant="outlined"
              sx={{
                width: "254px",
              }}
            >
              CONTINUE LEARNING
            </BoldStrokeButton>
          </Link>

          <Link
            to={`/lesson/confirm-start-testing?id=${lessonId}&name=${lessonName}&vocaSetId=${vocaSetId}`}
          >
            <BoldStrokeButton
              variant="contained"
              sx={{
                width: "254px",
              }}
            >
              TAKE EXAM
            </BoldStrokeButton>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CompleteLearningLessonPage;
