import { Clear } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getExerciseSet } from "../utils/exercise-helper";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import TestingExercise from "./TestingExercise";
import { Exercise } from "../types/Exercise";
import ClockTimer, { ClockTimerRef } from "./ClockTimer";
import { AnimatePresence } from "framer-motion";
import SuspendLearningDrawer from "./SuspendLearningDrawer";
import { PostLearningResultRequest } from "../types/LearningResultRequest";
import PracticeProgressBar from "./PracticeProgressBar";
import AnswerSound from "./AnswerSound";
import useLesson from "../../../hooks/useLesson";
import { LessonVocabulary } from "../../../types/LessonVocabulary";

const MIN_NUMBER_OF_EXERCISES = 4;
const DURATION_PER_EXERCISE = 15; // seconds

const VocaPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [vocabularies, setVocabularies] = useState<LessonVocabulary[]>([]);
  // console.log("vocabularies", vocabularies);

  const [correctVocaIds, setCorrectVocaIds] = useState<string[]>([]);
  const [takenTime, setTakenTime] = useState(0);

  const [openExitDrawer, setOpenExitDrawer] = useState(false);

  const { data: lesson, isLoading } = useLesson(
    lessonId!,
    {
      enabled: !!lessonId,
      refetchOnWindowFocus: false,
    },
    {
      withWords: 1,
    },
  );

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

  const postLearningResultMutation = useMutation({
    mutationFn: createLearningResult,
    onSuccess: () => {
      console.log("Post learning result successfully");
      navigate(
        `/lesson/learning-result?id=${lessonId}&vocaSetId=${lesson?.collectionId}`,
      );
    },
  });

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

  const postLearningResult = useCallback(() => {
    const listCorrectWord = new Set<string>();
    const listIncorrectWord = new Set<string>();

    for (const {
      voca: { id },
    } of exercises) {
      // As each voca has been repeated 2 * `repeatTimes` times
      // So, a voca is considered correct if it is answered correctly `repeatTimes` times
      if (
        correctVocaIds.filter((vocaId) => vocaId === id).length ==
        2 * repeatTimes
      ) {
        listCorrectWord.add(id);
      } else {
        listIncorrectWord.add(id);
      }
    }

    const request: PostLearningResultRequest = {
      idTopic: lessonId!,
      listCorrectWord: [...listCorrectWord],
      listIncorrectWord: [...listIncorrectWord],
      time: takenTime,
    };

    console.log(request);

    // postLearningResultMutation.mutate(request);
  }, [
    exercises,
    correctVocaIds,
    lessonId,
    postLearningResultMutation,
    repeatTimes,
    takenTime,
  ]);

  useEffect(() => {
    if (lesson) {
      setVocabularies(lesson.words || []);
    }
  }, [lesson]);

  const handleFulFillExercise = useCallback(() => {
    // The callback is re-defined in each time `exerciseIdx` changes, so the `exerciseIdx` is always the latest
    if (exercises.length > 0 && exerciseIdx + 1 >= exercises.length) {
      // Finish lesson
      postLearningResult();
    } else {
      setExerciseIdx((prev) => prev + 1);
    }
  }, [exercises.length, exerciseIdx, postLearningResult]);

  const handleAnswerExercise = useCallback(() => {
    const remainingTime = clockTimerRef.current?.stop() || 0;
    const implementTime = DURATION_PER_EXERCISE - remainingTime;

    setTakenTime((prev) => prev + implementTime);
  }, [clockTimerRef, setTakenTime]);

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Box sx={{ maxWidth: "962px", mx: "auto", padding: "30px 15px" }}>
          {postLearningResultMutation.isPending && <CustomBackdrop open />}
          {/* Header */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Close button */}
            <IconButton onClick={() => setOpenExitDrawer(true)}>
              <Clear />
            </IconButton>

            {/* Progress bar */}
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
            exitLink={`/voca/${lesson?.collectionId}/lessons`}
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

export default VocaPracticePage;
