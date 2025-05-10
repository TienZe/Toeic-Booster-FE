import { LessonVocabulary } from "../../../types/LessonVocabulary";
import { randInt, shuffleArray } from "../../../utils/helper";
import { Exercise } from "../types/Exercise";
import { ExerciseType } from "../types/ExerciseType";

// Generate random exercises based on the practice vocas, each voca will have a random exercise
export function generateRandomExercises(
  practiceVocas: LessonVocabulary[],
  exerciseKind: "guess" | "fill" | "both" = "both",
): Exercise[] {
  const numExerciseType = Object.keys(ExerciseType).length;

  let leftBound = 1;
  let rightBound = numExerciseType;

  if (exerciseKind === "guess") {
    rightBound = 5;
  } else if (exerciseKind === "fill") {
    leftBound = 6;
  }

  const shuffledVocas = shuffleArray(practiceVocas);
  const questions = [];

  for (const voca of shuffledVocas) {
    const type = randInt(leftBound, rightBound);
    // const type = 7;

    let actualType = ExerciseType.CHOOSE_WORD_BASED_ON_PHONETIC;
    switch (type) {
      // Kind of guessing
      case 1: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_PHONETIC;
        break;
      }
      case 2: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION;
        break;
      }
      case 3: {
        actualType = ExerciseType.CHOOSE_MEANING_BASED_ON_WORD;
        break;
      }
      case 4: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO;
        break;
      }
      case 5: {
        actualType = ExerciseType.CHOOSE_WORD_BASED_ON_DEFINITION;
        break;
      }

      // Kind of filling
      case 6: {
        actualType = ExerciseType.FILL_WORD_BASED_ON_SUGGESTION;
        break;
      }
      case 7: {
        actualType = ExerciseType.FILL_WORD_BASED_ON_AUDIO;
        break;
      }
      case 8: {
        actualType = ExerciseType.FILL_WORD_BASED_ON_DEFINITION;
        break;
      }
      case 9: {
        actualType = ExerciseType.FILL_WORD_BASED_ON_AUDIO;
        break;
      }
    }
    const question = generateQuestion(voca, actualType, practiceVocas);
    questions.push(question);
  }

  // console.log("questions", questions);

  return questions;
}

// Generate a set of exercises, each vocabulary will have 2 exercises, one for guessing and one for filling
export function getExerciseSet(
  practiceVocas: LessonVocabulary[],
  repeatTimes: number,
) {
  console.log("repeat times", repeatTimes);

  const guessingExercises: Exercise[] = [];
  for (let i = 0; i < repeatTimes; i++) {
    guessingExercises.push(...generateRandomExercises(practiceVocas, "guess"));
  }

  const fillingExercises: Exercise[] = [];
  for (let i = 0; i < repeatTimes; i++) {
    fillingExercises.push(...generateRandomExercises(practiceVocas, "fill"));
  }

  // console.log("guessing exercises", guessingExercises);
  // console.log("filling exercises", fillingExercises);
  return [
    ...shuffleArray(guessingExercises),
    ...shuffleArray(fillingExercises),
  ];
}

export function generateQuestion(
  voca: LessonVocabulary,
  type: ExerciseType,
  practiceVocas: LessonVocabulary[],
): Exercise {
  switch (type) {
    case ExerciseType.CHOOSE_WORD_BASED_ON_PHONETIC:
    case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION:
    case ExerciseType.CHOOSE_WORD_BASED_ON_DEFINITION:
    case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.word,
        options: getAnswerOptions(voca, practiceVocas, "word"),
      };
    }
    case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.meaning,
        options: getAnswerOptions(voca, practiceVocas, "meaning"),
      };
    }
    case ExerciseType.FILL_WORD_BASED_ON_SUGGESTION:
    case ExerciseType.FILL_WORD_BASED_ON_PHONETIC:
    case ExerciseType.FILL_WORD_BASED_ON_DEFINITION:
    case ExerciseType.FILL_WORD_BASED_ON_AUDIO: {
      return {
        question: getQuestion(type),
        voca: voca,
        type: type,
        correctAnswer: voca.word,
      };
    }
  }

  // default choose word based on suggestion
  return {
    question: getQuestion(type),
    voca: voca,
    type: type,
    correctAnswer: voca.word,
    options: getAnswerOptions(voca, practiceVocas, "word"),
  };
}

export function getAnswerOptions(
  voca: LessonVocabulary,
  practiceVocas: LessonVocabulary[],
  prop: Exclude<keyof LessonVocabulary, "thumbnail">,
): string[] {
  const anotherVocas = practiceVocas.filter((v) => v.id !== voca.id);
  const options = shuffleArray(anotherVocas)
    .slice(0, 3)
    .map((v) => v[prop] || "");

  options.push(voca[prop] || "");

  return shuffleArray(options as string[]);
}

export function getQuestion(exerciseType: ExerciseType) {
  switch (exerciseType) {
    case ExerciseType.CHOOSE_WORD_BASED_ON_PHONETIC:
      return "Choose the word that is correct with the following pronunciation:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO:
      return "Choose the correct word with the following sound:";
    case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD:
      return "Choose the correct meaning for the following vocabulary:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION:
      return "Choose the appropriate word from the following suggestions:";
    case ExerciseType.CHOOSE_WORD_BASED_ON_DEFINITION:
      return "Choose the word that matches the following definition:";
    // case ExerciseType.CHOOSE_WORD_BASED_ON_MEANING:
    //   return "Choose the correct word based on the meaning";
    // case ExerciseType.CHOOSE_DEFINITION_BASED_ON_WORD:
    //   return "Choose the correct definition based on the word";
    case ExerciseType.FILL_WORD_BASED_ON_PHONETIC:
      return "Type the correct word with the following pronunciation:";
    case ExerciseType.FILL_WORD_BASED_ON_DEFINITION:
      return "Type the word that matches the following definition:";
    case ExerciseType.FILL_WORD_BASED_ON_SUGGESTION:
      return "Type the appropriate word according to the following suggestions:";
    case ExerciseType.FILL_WORD_BASED_ON_AUDIO:
      return "Type the correct word with the following sound:";
    default:
      return "";
  }
}
