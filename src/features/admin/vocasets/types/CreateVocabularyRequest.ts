export default interface CreateVocabularyRequest {
  lessonId: string;
  thumbnail: string;
  audio: string;
  translate: string;
  pronunciation: string;
  wordClass: string;
  word: string;
  example: string;
  exampleMeaning: string;
  exampleAudio: string;
  definition: string;
}
