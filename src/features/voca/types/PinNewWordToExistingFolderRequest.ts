export default interface PinNewWordToExistingFolderRequest {
  folderId: string;
  audioUrl: string;
  translate: string;
  definition: string;
  pronunciation: string;
  wordClass: string;
  word: string;
  example?: string;
}
