export default interface CreateVocabularyRequest {
  word: string;
  thumbnail?: string;
  partOfSpeech: string;
  meaning?: string;
  definition?: string;
  pronunciation: string;
  pronunciationAudio?: string;
  
  example?: string | null;
  exampleMeaning?: string | null;
  exampleAudio?: string | null;
}
