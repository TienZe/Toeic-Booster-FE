import { LessonVocabulary } from "../../../types/LessonVocabulary";
import { ExerciseType } from "./ExerciseType";

export interface Exercise {
  question: string; // ask question
  voca: LessonVocabulary;
  type: ExerciseType;
  options?: string[]; // for multiple choice, if question is a fill-in-the-blank, this field is not needed
  correctAnswer: string;
}
