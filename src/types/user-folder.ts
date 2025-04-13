import VocabularyModel from "./VocabularyModel";

export interface UserFolder {
  id: string;
  name: string;
  description: string;
  createdAt: string;

  words: VocabularyModel[];
}
