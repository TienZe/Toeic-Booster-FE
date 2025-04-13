import VocabularyModel from "./VocabularyModel";
import VocaSetModel from "./VocaSetModel";
import DefaultLessonThumbnail from "../assets/images/voca/default-lesson-image.svg";
export default interface LessonModel {
  id: string;
  name: string;
  thumbnail: string | null;
  listWord: VocabularyModel[];
  groupTopic: VocaSetModel;
}

export interface LessonWithUserProgress extends LessonModel {
  isLearned: boolean;
  retainedWord: number;
}

export function getLessonThumbnail(lesson: LessonModel): string {
  if (lesson.thumbnail) {
    return lesson.thumbnail;
  }

  let thumbnail = null;
  if (lesson.listWord.length > 1) {
    thumbnail = lesson.listWord[0].thumbnail;
  }

  if (!thumbnail) {
    thumbnail = DefaultLessonThumbnail;
  }

  return thumbnail;
}
