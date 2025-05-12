import LessonLearning from "./LessonLearning";
import { VocabularyWordClass } from "./VocabularyModel";

/**
 * A model that represents a vocabulary in a lesson, already fallback with value by the related vocabulary
 */
export interface LessonVocabulary {
  id: number;
  lessonId: number;
  vocabularyId: number;
  word: string;
  thumbnail?: string | null;

  partOfSpeech: VocabularyWordClass;
  meaning: string;
  definition: string;
  pronunciation: string;

  pronunciationAudio: string | null;

  example: string | null;
  exampleMeaning: string | null;
  exampleAudio: string | null;

  userLessonLearning?: LessonLearning | null;
}
