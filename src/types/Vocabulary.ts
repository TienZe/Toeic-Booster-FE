export default interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  phoneticAudio?: string;
  definition: string;
  type: string;
  meaning: string;

  image?: string;
  exampleAudio?: string;
  example?: string;
  exampleMeaning?: string;
}
