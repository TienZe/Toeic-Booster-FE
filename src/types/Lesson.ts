import DefaultLessonThumbnail from "../assets/images/voca/default-lesson-image.svg";
export default interface Lesson {
  id: string;
  name: string;
  thumbnail: string | null;
  // listWord: VocabularyModel[];
  // groupTopic: VocaSetModel;
  createdAt: string;
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
