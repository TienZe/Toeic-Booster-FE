import DefaultLessonThumbnail from "../assets/images/voca/default-lesson-image.svg";
import { LessonVocabulary } from "./LessonVocabulary";
export default interface Lesson {
  id: number;
  name: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: string;

  collectionId: number | null;

  numOfWords: number;
  words: LessonVocabulary[];

  reservedThumbnail?: string | null;

  learningStep?: LearningStep; // The learning step of the posted user
  retainedWords?: number; // The number of retained words of the posted user in the lesson
}

export type LearningStep = "filtered" | "examined";

export interface LessonWithUserProgress extends Lesson {
  isLearned: boolean;
  retainedWord: number;
}

export function getLessonThumbnail(lesson: Lesson): string {
  if (lesson.thumbnail) {
    return lesson.thumbnail;
  }

  if (lesson.reservedThumbnail) {
    return lesson.reservedThumbnail;
  }

  return DefaultLessonThumbnail;
}
