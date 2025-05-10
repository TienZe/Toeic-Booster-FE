import DefaultLessonThumbnail from "../assets/images/voca/default-lesson-image.svg";
import { LessonVocabulary } from "./LessonVocabulary";
export default interface Lesson {
  id: number;
  name: string;
  thumbnail: string | null;
  createdAt: string;

  collectionId: number|null;

  numOfWords: number;
  words: LessonVocabulary[];
}

export interface LessonWithUserProgress extends Lesson {
  isLearned: boolean;
  retainedWord: number;
}

export function getLessonThumbnail(lesson: Lesson): string {
  if (lesson.thumbnail) {
    return lesson.thumbnail;
  }

  // if (lesson.listWord.length > 1) {
  //   return lesson.listWord[0].thumbnail;
  // }

  return DefaultLessonThumbnail;
}
