export interface PostLessonExamRequest {
  lessonId: number;
  duration: number;
  answers: LessonAnswer[];
}

interface LessonAnswer {
  lessonVocabularyId: number;
  isCorrect: boolean;
}
