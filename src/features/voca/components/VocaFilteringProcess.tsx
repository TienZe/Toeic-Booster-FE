import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import FlashCardCompositionAnimationType from "../types/FlashCardCompositionAnimationType";
import { AnimationType } from "../types/FlashCardCompositionAnimationType";
import LessonMainContent from "./LessonMainContent.tsx";
import SuspendLearningDrawer from "./SuspendLearningDrawer.tsx";
import FlashCardAnimationWrapper from "./FlashCardAnimationWrapper.tsx";
import VocaPresentationSlide from "./VocaPresentationSlide.tsx";
import BoldStrokeButton from "./BoldStrokeButton.tsx";
import { useState } from "react";
import { saveLessonLearning } from "../api/voca-learning.ts";
import { useMutation } from "@tanstack/react-query";
import { SaveLessonLearningRequest } from "../types/SaveLessonLearningRequest.ts";
import Lesson from "../../../types/Lesson.ts";
import CustomModal from "../../../components/UI/CustomModal.tsx";

interface VocaFilteringProcessProps {
  onFinish?: () => void;
  lesson: Lesson;
}

interface UserKnowledge {
  alreadyKnown: boolean;
  lessonVocabularyId: number;
}

const VocaFilteringProcess: React.FC<VocaFilteringProcessProps> = ({
  onFinish,
  lesson,
}) => {
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

  const vocabularies = lesson?.words || [];
  const vocaLength = vocabularies.length;

  const currentLessonVocabularyId = vocabularies[currentVocaIdx]?.id;

  const [openExitDrawer, setOpenExitDrawer] = useState(false);
  const [openConfirmSkipFiltering, setOpenConfirmSkipFiltering] =
    useState(false);

  const saveLessonLearningMutation = useMutation({
    mutationFn: saveLessonLearning,
    onSuccess: () => {
      onFinish?.();
    },
  });

  const handleAnswer = (known: boolean) => {
    const newUserKnowledge = [
      ...userKnowledge,
      {
        alreadyKnown: known,
        lessonVocabularyId: currentLessonVocabularyId,
      },
    ];

    setUserKnowledge([...newUserKnowledge]);

    // handleAnswer is recreated every time the component re-renders
    // so the currentVocaIdx is the voca index of current render
    setPrevVocaIdx(currentVocaIdx); // needed for animation

    if (currentVocaIdx === vocaLength - 1 && lesson) {
      // Finish filtering process
      const request: SaveLessonLearningRequest = {
        lessonId: lesson.id,
        lessonLearnings: newUserKnowledge,
      };

      saveLessonLearningMutation.mutate(request);
    }

    setCurrentVocaIdx((prev) => Math.min(prev + 1, vocaLength - 1));
  };

  const handleSkipFiltering = () => {
    const postUserKnowledge = [...userKnowledge];

    for (let i = currentVocaIdx; i < vocaLength; i++) {
      postUserKnowledge.push({
        alreadyKnown: false,
        lessonVocabularyId: vocabularies[i].id,
      });
    }

    console.log("constructed postUserKnowledge", postUserKnowledge);

    const request: SaveLessonLearningRequest = {
      lessonId: lesson.id,
      lessonLearnings: postUserKnowledge,
    };

    saveLessonLearningMutation.mutate(request);
  };

  return (
    <Stack sx={{ flex: 1 }}>
      <LessonMainContent sx={{ minHeight: "600px" }}>
        {/* Filtering progress */}
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

            const isPresented = idx === currentVocaIdx;

            return (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: isPresented ? 2 : 0,
                }}
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
            onClick={() => setOpenConfirmSkipFiltering(true)}
          >
            SKIP THE STEP
          </BoldStrokeButton>
        </Stack>
      </Box>

      <CustomModal
        open={openConfirmSkipFiltering}
        onClose={() => setOpenConfirmSkipFiltering(false)}
      >
        <Box sx={{ padding: 2, maxWidth: "500px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Are you sure to skip this step?
          </Typography>
          <Typography>
            Skipping this step results in marking all words as unknown
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSkipFiltering}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              OK
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpenConfirmSkipFiltering(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>

      <SuspendLearningDrawer
        open={openExitDrawer}
        onClose={() => setOpenExitDrawer(false)}
        onClickStay={() => setOpenExitDrawer(false)}
        exitLink={`/voca/${lesson?.collectionId}/lessons`}
      />
    </Stack>
  );
};

export default VocaFilteringProcess;
