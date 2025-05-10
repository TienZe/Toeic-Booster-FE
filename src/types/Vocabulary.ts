import { VocabularyWordClass } from "./VocabularyModel";

export default interface Vocabulary {
  id: string|number;
  word: string;
  phonetic: string;
  phoneticAudio?: string;
  definition: string;
  type: VocabularyWordClass;
  meaning: string;

  image?: string;
  exampleAudio?: string;
  example?: string;
  exampleMeaning?: string;
}
