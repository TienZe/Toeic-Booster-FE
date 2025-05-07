export default interface VocabularyModel {
  id: string;
  word: string;

  definition: string;
  meaning: string;
  partOfSpeech: VocabularyWordClass;

  pronunciation: string;
  pronunciationAudio: string | null;

  thumbnail: string | null;

  example: string | null;
  exampleAudio: string | null;
  exampleMeaning: string | null;
}

export enum VocabularyWordClassAbbr {
  NOUN = "n",
  VERB = "v",
  ADJECTIVE = "adj",
  ADVERB = "adv",
  PRONOUN = "pron",
  PREPOSITION = "prep",
  CONJUNCTION = "conj",
  INTERJECTION = "int",
  DETERMINER = "det",
}

export enum VocabularyWordClass {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
  ADVERB = "adverb",
  PRONOUN = "pronoun",
  PREPOSITION = "preposition",
  CONJUNCTION = "conjunction",
  INTERJECTION = "interjection",
  DETERMINER = "determiner",
}
