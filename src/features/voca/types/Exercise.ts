import VocabularyModel from "../../../types/VocabularyModel";
import { ExerciseType } from "./ExerciseType";

export interface Exercise {
  question: string; // ask question
  voca: VocabularyModel;
  type: ExerciseType;
  options?: string[]; // for multiple choice, if question is a fill-in-the-blank, this field is not needed
  correctAnswer: string;
}
