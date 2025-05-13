export type WordResult = {
  word: string;
  phonetic?: string;
  phonetics: PhoneticPair[];
  meanings: MeaningComposition[];
};

type PhoneticPair = {
  text?: string;
  audio: string;
};

type MeaningComposition = {
  partOfSpeech: string;
  definitions: DefinitionDetail[];
};

type DefinitionDetail = {
  definition: string;
  example?: string;
};

export type WordItem = {
  word: string;
  pronunciation: string | null;
  pronunciationAudio: string | null;
  partOfSpeech: string;
  definition: string;
  example?: string;
  meaning?: string;

  vocabularyId?: string | number; // only for system words if this type represent a DTO for vocabulary model
};
