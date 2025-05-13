export default interface PinNewWordToExistingFolderRequest {
  folderId: string;
  pronunciationAudio: string | null; // temporary just post url string (no upload operation)
  meaning: string;
  definition: string;
  pronunciation: string;
  partOfSpeech: string;
  word: string;
  example?: string | null;
}
