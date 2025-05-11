import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import FlashCardComposition from "./FlashCardComposition";
import WrongAnswerAudio from "../assets/learning_wrong.mp3";
import CorrectAnswerAudio from "../assets/learning_right.mp3";
import FlashCardCompositionAnimationType from "../types/FlashCardCompositionAnimationType";
import { AnimationType } from "../types/FlashCardCompositionAnimationType";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Vocabulary from "../../../types/Vocabulary.ts";
import CustomBackdrop from "../../../components/UI/CustomBackdrop.tsx";
import LessonHeader from "./LessonHeader.tsx";
import LessonMainContent from "./LessonMainContent.tsx";
import SuspendLearningDrawer from "./SuspendLearningDrawer.tsx";
import CuteButton from "./CuteButton.tsx";
import PinIcon from "./PinIcon.tsx";
import NewWordFolderModal from "./NewFolderModal.tsx";
import PinWordModalModal from "./PinWordModal.tsx";
import { getWordThumbnail } from "../../../utils/helper.ts";
import useLesson from "../../../hooks/useLesson.ts";

const LearningVocaPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [currentVocaIdx, setCurrentVocaIdx] = useState(0);
  const [prevVocaIdx, setPrevVocaIdx] = useState(0);

  let direction = "Unchanged";

  if (currentVocaIdx > prevVocaIdx) {
    direction = "Right";
  } else if (currentVocaIdx < prevVocaIdx) {
    direction = "Left";
  }

  // console.log("direction", direction);

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

  const currentVocaId = vocabularies[currentVocaIdx]?.id;

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const [openExitDrawer, setOpenExitDrawer] = useState(false);
  const [pinModal, setPinModal] = useState<string>(""); // pin to folder modal, new folder modal

  const handleNext = () => {
    // handleNext is recreated every time the component re-renders
    // so the currentVocaIdx is the voca index of current render
    setPrevVocaIdx(currentVocaIdx);

    if (currentVocaIdx === vocaLength - 1 && lesson) {
      // Finish learning
      navigate(
        `/lesson/complete-learning?id=${lesson.id}&name=${lesson.name}&vocaSetId=${lesson.collectionId}`,
      );
    }
    setCurrentVocaIdx((prev) => Math.min(prev + 1, vocaLength - 1));
  };

  const handlePrev = () => {
    setPrevVocaIdx(currentVocaIdx);
    setCurrentVocaIdx((prev) => Math.max(prev - 1, 0));
  };

  const playWrongAnswerAudio = () => {
    wrongAnswerAudioRef.current?.play();
  };

  const playCorrectAnswerAudio = async () => {
    await correctAnswerAudioRef.current?.play();
    // Add a little delay
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  const handleCorrectAnswer = async () => {
    await playCorrectAnswerAudio();
  };

  const handleWrongAnswer = () => {
    playWrongAnswerAudio();
  };

  if (
    isSuccess &&
    (!lesson?.words || lesson.words.length === 0 || !currentVocaId)
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
        title="learn"
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

              const dto: Vocabulary = {
                id: voca.id,
                word: voca.word,
                type: voca.partOfSpeech,
                definition: voca.definition || "",
                example: voca.example || "",
                exampleMeaning: voca.exampleMeaning || "",
                meaning: voca.meaning || "",
                phonetic: voca.pronunciation || "",
                image: getWordThumbnail(voca),
                phoneticAudio: voca.pronunciationAudio || "",
                exampleAudio: voca.exampleAudio || "",
              };

              return (
                <FlashCardComposition
                  key={voca.id + (animate || "")}
                  voca={dto}
                  onCorrectAnswer={handleCorrectAnswer}
                  onWrongAnswer={handleWrongAnswer}
                  onSubmitAfterCorrectAnswer={handleNext}
                  animate={animate}
                  visible={idx === currentVocaIdx || idx === prevVocaIdx}
                  active={idx === currentVocaIdx}
                />
              );
            })}
          </div>
        </LessonMainContent>
      )}

      {/* Next/prev button */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100px", maxWidth: "962px", mx: "auto" }}
        >
          <ArrowIcon
            sx={{
              color: "primary.main",
              fontSize: "70px",
              cursor: "pointer",
              transform: "scaleX(-1)",
            }}
            onClick={handlePrev}
          />
          <CuteButton
            label="Pin Word"
            sx={{ color: "primary.main" }}
            icon={<PinIcon color="primary" />}
            onClick={() => setPinModal("pinToFolder")}
          />
          <ArrowIcon
            sx={{ color: "primary.main", fontSize: "70px", cursor: "pointer" }}
            onClick={handleNext}
          />
        </Stack>
      </Box>

      <SuspendLearningDrawer
        open={openExitDrawer}
        onClose={() => setOpenExitDrawer(false)}
        onClickStay={() => setOpenExitDrawer(false)}
        exitLink={isLoading ? "/" : `/voca/${lesson?.collectionId}/lessons`}
      />
      {pinModal === "newFolder" && (
        <NewWordFolderModal
          open
          onClose={() => setPinModal("")}
          vocaId={currentVocaId}
        />
      )}
      {pinModal === "pinToFolder" && (
        <PinWordModalModal
          open
          onClose={() => setPinModal("")}
          onClickNewFolderButton={() => setPinModal("newFolder")}
          vocaId={currentVocaId}
        />
      )}

      {/* Audio */}
      <audio id="audio-answer-wrong" ref={wrongAnswerAudioRef}>
        <source src={WrongAnswerAudio} type="audio/mpeg" />
      </audio>
      <audio id="audio-answer-correct" ref={correctAnswerAudioRef}>
        <source src={CorrectAnswerAudio} type="audio/mpeg" />
      </audio>
    </Stack>
  );
};

export default LearningVocaPage;
