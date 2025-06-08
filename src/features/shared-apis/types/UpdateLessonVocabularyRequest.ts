export interface UpdateLessonVocabularyRequest {
  lessonVocabularyId: number;
  thumbnail?: string;
  partOfSpeech?: string;
  meaning?: string;
  definition?: string;
  pronunciation?: string;
  pronunciationAudio?: string;
  example?: string;
  exampleMeaning?: string;
  exampleAudio?: string;
}
