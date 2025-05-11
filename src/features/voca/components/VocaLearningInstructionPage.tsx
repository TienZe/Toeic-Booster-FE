import { Box, Stack, Typography } from "@mui/material";
import LessonHeader from "./LessonHeader";
import LessonMainContent from "./LessonMainContent";
import LearningIntroImage from "../assets/learning-intro.png";
import { Image } from "../../../components/UI/Image";
import RuleItem from "./RuleItem";
import FilteringIcon from "../assets/learning-intro-images/filtering.svg";
import LearningIcon from "../assets/learning-intro-images/learning.svg";
import TestingIcon from "../assets/learning-intro-images/testing.svg";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Link from "../../../components/UI/Link";
import BoldStrokeButton from "./BoldStrokeButton";

const VocaLearningInstructionPage: React.FC = () => {
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
        // title="test"
        lessonName={lessonName || ""}
        onExit={() => navigate(vocaSetId ? `/voca/${vocaSetId}/lessons` : "/")}
      />
      <LessonMainContent sx={{ paddingTop: "50px", maxWidth: "840px" }}>
        <Stack direction="row">
          <Image
            src={LearningIntroImage}
            sx={{ maxWidth: "280px", paddingTop: "20px", alignSelf: "start" }}
          />
          <Box sx={{ paddingLeft: "80px", paddingTop: "20px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: "36px" }}
              color="primary.main"
            >
              Vocabulary learning process
            </Typography>
            <Typography
              sx={{ fontWeight: "medium", fontSize: "18px", marginTop: 0.5 }}
            >
              Just 3 steps:
            </Typography>

            <Stack
              spacing="25px"
              sx={{ marginTop: "40px", paddingLeft: "15px" }}
            >
              <RuleItem
                icon={FilteringIcon}
                heading="Step 1: Filtering"
                rule="Helps clearly identify your learning goals and avoid wasting time on words you already know."
              />
              <RuleItem
                icon={LearningIcon}
                heading="Step 2: Vocabulary Learning"
                rule="Applies a 3-sided flashcard method to stimulate thinking and enhance faster vocabulary retention."
              />

              <RuleItem
                icon={TestingIcon}
                heading="Step 3: Do The Test"
                rule="The test helps you clearly assess your progress before and after studying."
              />
            </Stack>
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
          justifyContent="end"
          sx={{ maxWidth: "890px", mx: "auto" }}
        >
          <Link to={`/lesson/filtering?id=${lessonId}`}>
            <BoldStrokeButton
              variant="contained"
              sx={{
                width: "254px",
              }}
            >
              START
            </BoldStrokeButton>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default VocaLearningInstructionPage;
