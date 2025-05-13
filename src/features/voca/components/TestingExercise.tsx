import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Exercise } from "../types/Exercise";
import PracticeFlipAnimation from "./PracticeFlipAnimation";
import PracticeResultSlide from "./PracticeResultSlide";
import AnswerGuessItem from "./AnswerGuessItem";
import { ExerciseType } from "../types/ExerciseType";
import PhoneticQuestionSlide from "./PhoneticQuestionSlide";
import MeaningQuestionSlide from "./MeaningQuestionSlide";
import WordQuestionSlide from "./WordQuestionSlide";
import AnswerForm from "./AnswerForm";
import DefinitionQuestionSlide from "./DefinitionQuestionSlide";
import { Image } from "../../../components/UI/Image";
import RightAnswerGif from "../assets/right-answer.gif";
import PhoneticAudioQuestionSlide from "./PhoneticAudioQuestionSlide";
import { motion } from "framer-motion";
import {
  getWordThumbnail,
  strEqualIgnoreCase,
  vocaWordClassFullName2Abbr,
} from "../../../utils/helper";

interface TestingExerciseProps {
  exercise: Exercise;
  onFulfilled?: () => void; // Trigger when the exercise has been fulfilled (after displaying the result)
  onAnswered?: () => void; // Trigger when the user has answered the question
  onCorrectAnswer?: (
    correctLessonVocabularyId: number,
    type: ExerciseType,
  ) => void;
  onWrongAnswer?: () => void;
}

const TOTAL_PERSON_DECORATIONS = 8;
const EXERCISE_DELAY_FULFILLED = 3000;

const animateVaraints = {
  fadeInRight: {
    opacity: [0, 1],
    x: [50, 0],
  },

  fadeOutLeft: {
    opacity: [1, 0.2, 0],
    x: [0, -50],
  },
};

const TestingExercise: React.FC<TestingExerciseProps> = ({
  exercise,
  onFulfilled,
  onAnswered,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const hasAnswered = userAnswer !== "";
  const isAnswerCorrect =
    hasAnswered && strEqualIgnoreCase(userAnswer, exercise.correctAnswer);

  const mainVoca = exercise.voca;
  const isSelectQuestion = exercise.options && exercise.options.length > 0;

  const firstSlide = useMemo(() => {
    switch (exercise.type) {
      case ExerciseType.CHOOSE_WORD_BASED_ON_PHONETIC:
      case ExerciseType.FILL_WORD_BASED_ON_PHONETIC: {
        return <PhoneticQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO:
      case ExerciseType.FILL_WORD_BASED_ON_AUDIO: {
        return <PhoneticAudioQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION:
      case ExerciseType.FILL_WORD_BASED_ON_SUGGESTION: {
        return <WordQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD: {
        return <MeaningQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_WORD_BASED_ON_DEFINITION:
      case ExerciseType.FILL_WORD_BASED_ON_DEFINITION: {
        return <DefinitionQuestionSlide voca={mainVoca} />;
      }
    }

    return <WordQuestionSlide voca={mainVoca} />;
  }, [exercise.type, mainVoca]);

  const personDecoIndex = useMemo(
    () => Math.floor(Math.random() * TOTAL_PERSON_DECORATIONS) + 1,
    [],
  );

  const [personDecoFileName, setPersonDecoFileName] = useState("image.png");

  const handleSelectAnswer = (selectedAnswer: string) => {
    console.log("selectedAnswer", selectedAnswer);
    if (!userAnswer) {
      setUserAnswer(selectedAnswer);
      onAnswered?.();

      setTimeout(() => {
        onFulfilled?.();
      }, EXERCISE_DELAY_FULFILLED);

      if (strEqualIgnoreCase(selectedAnswer, exercise.correctAnswer)) {
        onCorrectAnswer?.(exercise.voca.id, exercise.type);
      } else {
        onWrongAnswer?.();
      }
    }
  };

  useEffect(() => {
    let hasShowGif = false;
    if (isAnswerCorrect) {
      setPersonDecoFileName("correct.gif");
      hasShowGif = true;
    } else if (hasAnswered) {
      // Wrong answer
      setPersonDecoFileName("fail.gif");
      hasShowGif = true;
    }

    if (hasShowGif) {
      setTimeout(() => {
        // Set the person deco gif back to default
        setPersonDecoFileName("image.png");
      }, 2000);
    }
  }, [hasAnswered, isAnswerCorrect]);

  return (
    <motion.div
      variants={animateVaraints}
      animate="fadeInRight"
      exit="fadeOutLeft"
      transition={{ duration: 0.3, type: "tween" }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
    >
      <Stack direction="row">
        {/* Gif deco */}
        <Box sx={{ width: "180px", paddingRight: "40px", paddingTop: "75px" }}>
          <Image
            src={`/assets/voca-persons/${personDecoIndex}/${personDecoFileName}`}
          />
        </Box>

        {/* Question */}
        <Box sx={{ flexGrow: 1, minWidth: "360px" }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: "28px",
              color: "#4c4c4c",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
            align="center"
          >
            {exercise.question}
          </Typography>

          <PracticeFlipAnimation
            firstSlide={firstSlide}
            secondSlide={
              <PracticeResultSlide
                word={mainVoca.word}
                audio={mainVoca.pronunciationAudio}
                meaning={mainVoca.meaning}
                phonetic={mainVoca.pronunciation}
                thumbnail={getWordThumbnail(mainVoca)}
                playAudio={hasAnswered}
                audioDelay={500}
                partOfSpeech={vocaWordClassFullName2Abbr(mainVoca.partOfSpeech)}
              />
            }
            flip={hasAnswered}
          />
        </Box>
      </Stack>

      {/* Answer Options */}
      {isSelectQuestion ? (
        // Select question
        <Grid2 container spacing="26px" sx={{ px: "13px", marginTop: 2.5 }}>
          {exercise.options?.map((option) => {
            let state: "correct" | "wrong" | "default" = "default";

            if (hasAnswered) {
              if (option === exercise.correctAnswer) {
                state = "correct";
              } else if (option === userAnswer) {
                state = "wrong";
              }
            }

            return (
              <Grid2 size={6} key={option}>
                <AnswerGuessItem
                  answer={option}
                  disabled={hasAnswered}
                  state={state}
                  onClick={handleSelectAnswer}
                />
              </Grid2>
            );
          })}
        </Grid2>
      ) : (
        // Fill question
        <Box sx={{ marginTop: 2.5, position: "relative" }}>
          <AnswerForm
            placeholder="Type your answer here"
            inputSx={{
              maxWidth: "730px",
              width: "100%",
              height: "auto",
              paddingBottom: "80px",
            }}
            active={true}
            status={
              isAnswerCorrect ? "correct" : hasAnswered ? "wrong" : "default"
            }
            onSubmit={handleSelectAnswer}
          />
          {isAnswerCorrect && (
            <Image
              src={RightAnswerGif + `?cacheBuster=${Date.now()}`}
              sx={{
                position: "absolute",
                left: "20%",
                top: "0",
                width: "300px",
              }}
            />
          )}
        </Box>
      )}
    </motion.div>
  );
};

export default TestingExercise;
