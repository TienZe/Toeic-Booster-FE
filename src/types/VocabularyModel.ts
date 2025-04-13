export default interface VocabularyModel {
  id: string;
  audio: string;
  definition: string;
  example: string;
  exampleAudio: string;
  exampleMeaning: string;
  pronunciation: string;
  thumbnail: string | null;
  translate: string;
  word: string;
  wordClass: VocabularyWordClass;
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
  NOUN = "nouns",
  VERB = "verbs",
  ADJECTIVE = "adjectives",
  ADVERB = "adverbs",
  PRONOUN = "pronouns",
  PREPOSITION = "prepositions",
  CONJUNCTION = "conjunctions",
  INTERJECTION = "interjections",
  DETERMINER = "determiners",
}
