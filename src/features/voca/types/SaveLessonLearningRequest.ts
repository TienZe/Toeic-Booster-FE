export interface SaveLessonLearningRequest {
  lessonId: number;
  lessonLearnings: {
    lessonVocabularyId: number;
    alreadyKnown: boolean;
  }[];
}
