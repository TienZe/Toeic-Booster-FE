import { VocabularyWordClass } from "./VocabularyModel";

export interface LessonVocabulary {
  id: number;
  lessonId: number;
  vocabularyId: string;
  word: string;
  thumbnail?: string | null;

  partOfSpeech?: VocabularyWordClass;
  meaning?: string | null;
  definition?: string | null;
  pronunciation?: string | null;

  pronunciationAudio?: string | null;

  example?: string | null;
  exampleMeaning?: string | null;
  exampleAudio?: string | null;
}
