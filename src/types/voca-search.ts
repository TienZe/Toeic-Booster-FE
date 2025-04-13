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
  phonetic?: string;
  phoneticAudio: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  meaning?: string;
};
