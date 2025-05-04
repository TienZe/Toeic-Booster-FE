import VocabularyModel from "./VocabularyModel";
import VocaSetModel from "./VocaSetModel";
import DefaultLessonThumbnail from "../assets/images/voca/default-lesson-image.svg";
export default interface Lesson {
  id: string;
  name: string;
  // thumbnail: string | null;
  // listWord: VocabularyModel[];
  // groupTopic: VocaSetModel;
  createdAt: string;
}

export interface LessonWithUserProgress extends Lesson {
  isLearned: boolean;
  retainedWord: number;
}

export function getLessonThumbnail(lesson: Lesson): string {
  let thumbnail = null;
  // if (lesson.listWord.length > 1) {
  //   thumbnail = lesson.listWord[0].thumbnail;
  // }

  if (!thumbnail) {
    thumbnail = DefaultLessonThumbnail;
  }

  return thumbnail;
}
