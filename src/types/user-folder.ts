import { LessonVocabulary } from "./LessonVocabulary";

export interface UserFolder {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  numOfWords: number;
  reservedThumbnail?: string | null;

  words?: LessonVocabulary[];
}
