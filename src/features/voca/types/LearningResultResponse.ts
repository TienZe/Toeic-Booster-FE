import { LessonVocabulary } from "../../../types/LessonVocabulary";

export type LearningResult = {
  numCorrect: number;
  totalWords: number;
  duration: number;

  correctWords: LessonVocabulary[];
  incorrectWords: LessonVocabulary[];
};

export type LearningResultResponse = {
  current: LearningResult;
  mostRecent: LearningResult;
  best: LearningResult;
};
