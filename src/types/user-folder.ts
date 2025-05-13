import { LessonVocabulary } from "./LessonVocabulary";

export interface UserFolder {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;

  words?: LessonVocabulary[];
}
