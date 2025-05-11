import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import FlashCardCompositionAnimationType from "../types/FlashCardCompositionAnimationType";
import { AnimationType } from "../types/FlashCardCompositionAnimationType";
import { Navigate, useSearchParams } from "react-router-dom";
import CustomBackdrop from "../../../components/UI/CustomBackdrop.tsx";
import LessonHeader from "./LessonHeader.tsx";
import LessonMainContent from "./LessonMainContent.tsx";
import SuspendLearningDrawer from "./SuspendLearningDrawer.tsx";
import useLesson from "../../../hooks/useLesson.ts";
import FlashCardAnimationWrapper from "./FlashCardAnimationWrapper.tsx";
import VocaPresentationSlide from "./VocaPresentationSlide.tsx";
import BoldStrokeButton from "./BoldStrokeButton.tsx";
import { useState } from "react";
import { saveLessonLearning } from "../api/voca-learning.ts";
import { useMutation } from "@tanstack/react-query";
import { SaveLessonLearningRequest } from "../types/SaveLessonLearningRequest.ts";
import { toast } from "react-toastify";

interface UserKnowledge {
  alreadyKnown: boolean;
  lessonVocabularyId: number;
}

const VocaFilteringPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  // store the index of current lesson vocabulary in the vocabularies array
  const [currentVocaIdx, setCurrentVocaIdx] = useState(0);

  const [prevVocaIdx, setPrevVocaIdx] = useState(0);

  const [userKnowledge, setUserKnowledge] = useState<UserKnowledge[]>([]);

  let direction = "Unchanged";

  if (currentVocaIdx > prevVocaIdx) {
    direction = "Right";
  } else if (currentVocaIdx < prevVocaIdx) {
    direction = "Left";
  }

  const {
    data: lesson,
    isLoading,
    isSuccess,
  } = useLesson(
    lessonId!,
    {
      enabled: !!lessonId,
    },
    {
      withWords: 1,
    },
  );

  const vocabularies = lesson?.words || [];
  const vocaLength = vocabularies.length;

  const currentLessonVocabularyId = vocabularies[currentVocaIdx]?.id;

  const [openExitDrawer, setOpenExitDrawer] = useState(false);

  const saveLessonLearningMutation = useMutation({
    mutationFn: saveLessonLearning,
    onSuccess: () => {
      toast.success("Save lesson learning successfully");
    },
  });

  const handleAnswer = (known: boolean) => {
    setUserKnowledge((prev) => [
      ...prev,
      {
        alreadyKnown: known,
        lessonVocabularyId: currentLessonVocabularyId,
      },
    ]);

    // handleNext is recreated every time the component re-renders
    // so the currentVocaIdx is the voca index of current render
    setPrevVocaIdx(currentVocaIdx); // needed for animation

    if (currentVocaIdx === vocaLength - 1 && lesson) {
      // Finish filtering
      console.log("userKnowledge", userKnowledge);

      const request: SaveLessonLearningRequest = {
        lessonId: lesson.id,
        lessonLearnings: userKnowledge,
      };

      saveLessonLearningMutation.mutate(request);
    }

    setCurrentVocaIdx((prev) => Math.min(prev + 1, vocaLength - 1));
  };

  if (
    isSuccess &&
    (!lesson?.words || lesson.words.length === 0 || !currentLessonVocabularyId)
  ) {
    let redirectLink = "/";
    if (lesson.collectionId) {
      redirectLink = `/voca/${lesson.collectionId}/lessons`;
    }

    return <Navigate to={redirectLink} />;
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/*  Header */}
      <LessonHeader
        title="filtering"
        lessonName={lesson?.name}
        onExit={() => setOpenExitDrawer(true)}
      />

      {isLoading ? (
        <>
          <CustomBackdrop />

          {/* Placeholder space */}
          <Box sx={{ flexGrow: 1 }}></Box>
        </>
      ) : (
        <LessonMainContent sx={{ minHeight: "600px" }}>
          {/* Question progress */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{ padding: "30px 15px", marginBottom: "24px" }}
            spacing={1}
          >
            <Typography fontSize={22} fontWeight={700} color="#B4B4B4">
              {currentVocaIdx + 1}/{vocaLength}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={((currentVocaIdx + 1) / vocaLength) * 100}
              color="success"
              sx={{
                height: "15px",
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                flexGrow: 1,
              }}
            />
          </Stack>

          {/* Flashcard */}
          <div style={{ position: "relative" }}>
            {vocabularies.map((voca, idx) => {
              let animate: FlashCardCompositionAnimationType = undefined;

              if (direction !== "Unchanged") {
                if (idx === currentVocaIdx) {
                  animate =
                    direction === "Right"
                      ? AnimationType.EnterRight
                      : AnimationType.EnterLeft;
                } else if (idx === prevVocaIdx) {
                  animate =
                    direction === "Right"
                      ? AnimationType.ExitLeft
                      : AnimationType.ExitRight;
                }
              }

              return (
                <Box
                  sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                >
                  <FlashCardAnimationWrapper
                    key={voca.id + (animate || "")}
                    animate={animate}
                    visible={idx === currentVocaIdx || idx === prevVocaIdx}
                  >
                    <VocaPresentationSlide voca={voca} />
                  </FlashCardAnimationWrapper>
                </Box>
              );
            })}
          </div>

          {/* Action buttons */}
          <Stack
            spacing={2}
            sx={{
              marginTop: "440px",
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Typography variant="h5">Do you know this word?</Typography>
            <Stack direction="row" spacing={2}>
              <BoldStrokeButton
                variant="outlined"
                onClick={() => handleAnswer(false)}
              >
                Don't know
              </BoldStrokeButton>
              <BoldStrokeButton
                variant="contained"
                color="success"
                onClick={() => handleAnswer(true)}
              >
                Already known
              </BoldStrokeButton>
            </Stack>
          </Stack>
        </LessonMainContent>
      )}

      {/* Footer button */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
        }}
      >
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          sx={{ height: "100px", maxWidth: "962px", mx: "auto" }}
        >
          <BoldStrokeButton
            variant="outlined"
            sx={{
              width: "254px",
            }}
          >
            SKIP THE STEP
          </BoldStrokeButton>
        </Stack>
      </Box>

      <SuspendLearningDrawer
        open={openExitDrawer}
        onClose={() => setOpenExitDrawer(false)}
        onClickStay={() => setOpenExitDrawer(false)}
        exitLink={isLoading ? "/" : `/voca/${lesson?.collectionId}/lessons`}
      />
    </Stack>
  );
};

export default VocaFilteringPage;
