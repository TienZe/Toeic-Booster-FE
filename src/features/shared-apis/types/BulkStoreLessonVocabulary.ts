export interface BulkStoreLessonVocabularyRequest {
  lessonId: number; // the lesson id attached to
  words: PostWordItem[];
}

export interface PostWordItem {
  word?: string;
  vocabularyId?: number;
  thumbnail?: string;
  partOfSpeech?: string;
  meaning?: string;
  definition?: string;
  pronunciation?: string;
  pronunciationAudio?: string | null;
  example?: string;
  exampleMeaning?: string;
  exampleAudio?: string;
  lessonVocabularyId?: number; // lesson vocabulary id that should be replicated
}
