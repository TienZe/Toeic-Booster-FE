import { Clear } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getExerciseSet } from "../utils/exercise-helper";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import VocabularyModel from "../../../types/VocabularyModel";
import TestingExercise from "./TestingExercise";
import { Exercise } from "../types/Exercise";
import ClockTimer, { ClockTimerRef } from "./ClockTimer";
import { AnimatePresence } from "framer-motion";
import SuspendLearningDrawer from "./SuspendLearningDrawer";
import { getUserFolderById } from "../api/user-folder";
import PracticeProgressBar from "./PracticeProgressBar";
import AnswerSound from "./AnswerSound";
import { useDispatch } from "react-redux";
import { folderPracticeActions } from "../../../stores/folderPracticeSlice";
import { UserFolder } from "../../../types/user-folder";

const MIN_NUMBER_OF_EXERCISES = 4;
const DURATION_PER_EXERCISE = 15; // seconds

const FolderPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const dispatch = useDispatch();

  const [vocabularies, setVocabularies] = useState<VocabularyModel[]>([]);
  // console.log("vocabularies", vocabularies);

  const [correctVocaIds, setCorrectVocaIds] = useState<string[]>([]);
  const [takenTime, setTakenTime] = useState(0);

  const [openExitDrawer, setOpenExitDrawer] = useState(false);

  const { data: folder, isLoading } = useQuery({
    queryKey: ["userFolders", { id: folderId }],
    queryFn: () => getUserFolderById(folderId!),
    enabled: !!folderId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const [exerciseIdx, setExerciseIdx] = useState(0);

  const repeatTimes = useMemo(() => {
    const numOfVocabularies = vocabularies.length;
    return Math.ceil(MIN_NUMBER_OF_EXERCISES / (2 * numOfVocabularies));
  }, [vocabularies]);

  const exercises = useMemo(() => {
    if (vocabularies.length === 0) {
      return [];
    }

    return getExerciseSet(vocabularies, repeatTimes);
  }, [vocabularies, repeatTimes]);

  const activeExercise: Exercise | undefined = exercises[exerciseIdx];

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const clockTimerRef = useRef<ClockTimerRef>(null);

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

  const handleCorrectAnswer = async (correctVocaId: string) => {
    setCorrectVocaIds((prev) => [...prev, correctVocaId]);
    await playCorrectAnswerAudio();
  };

  const handleWrongAnswer = () => {
    playWrongAnswerAudio();
  };

  useEffect(() => {
    if (folder) {
      setVocabularies(folder.words || []);
    }
  }, [folder]);

  const handleFulFillExercise = useCallback(() => {
    // The callback is re-defined in each time `exerciseIdx` changes, so the `exerciseIdx` is always the latest
    if (exercises.length > 0 && exerciseIdx + 1 >= exercises.length) {
      // Finish lesson
      const actualCorrectVocaIds = correctVocaIds.filter(
        (vocaId) =>
          correctVocaIds.filter((id) => id === vocaId).length ===
          2 * repeatTimes,
      );
      console.log("actualCorrectVocaIds", actualCorrectVocaIds);
      dispatch(
        folderPracticeActions.savePracticeResult({
          folder: folder as UserFolder,
          correctVocaIds: [...new Set(actualCorrectVocaIds)],
          takenTime: takenTime,
        }),
      );
      navigate(`/personal-word-folder/${folderId}/practice-result`);
    } else {
      setExerciseIdx((prev) => prev + 1);
    }
  }, [
    exercises.length,
    exerciseIdx,
    correctVocaIds,
    dispatch,
    folder,
    takenTime,
    navigate,
    folderId,
    repeatTimes,
  ]);

  const handleAnswerExercise = useCallback(() => {
    const remainingTime = clockTimerRef.current?.stop() || 0;
    const implementTime = DURATION_PER_EXERCISE - remainingTime;

    setTakenTime((prev) => prev + implementTime);
  }, [clockTimerRef, setTakenTime]);

  if (!folderId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Box sx={{ maxWidth: "962px", mx: "auto", padding: "30px 15px" }}>
          {/* Header */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Close button */}
            <IconButton onClick={() => setOpenExitDrawer(true)}>
              <Clear />
            </IconButton>

            <PracticeProgressBar
              progress={(exerciseIdx / exercises.length) * 100}
            />

            <ClockTimer
              key={exerciseIdx}
              duration={DURATION_PER_EXERCISE}
              delay={1}
              timerRef={clockTimerRef}
              sx={{ paddingLeft: "8px" }}
            />
          </Stack>

          <Box sx={{ py: "25px", position: "relative", marginTop: 2 }}>
            {activeExercise && (
              <AnimatePresence>
                <TestingExercise
                  exercise={activeExercise}
                  key={exerciseIdx + "-" + activeExercise.voca.id}
                  onFulfilled={handleFulFillExercise}
                  onCorrectAnswer={handleCorrectAnswer}
                  onWrongAnswer={handleWrongAnswer}
                  onAnswered={handleAnswerExercise}
                />
              </AnimatePresence>
            )}
          </Box>

          <SuspendLearningDrawer
            open={openExitDrawer}
            onClose={() => setOpenExitDrawer(false)} // onCloseDrawer
            onClickStay={() => setOpenExitDrawer(false)}
            exitLink={`/personal-word-folder/${folderId}`}
          />
        </Box>
      )}

      {/* Audio */}
      <AnswerSound
        wrongAnswerAudioRef={wrongAnswerAudioRef}
        correctAnswerAudioRef={correctAnswerAudioRef}
      />
    </>
  );
};

export default FolderPracticePage;
