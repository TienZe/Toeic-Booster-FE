export interface NewUserFolderRequest {
  name: string;
  description: string;
}

export interface UpdateFolderRequest {
  id: string;
  name: string;
  description: string;
}

export interface UpdateWordOfFolderRequest {
  wordId: string;
  translate: string;
  definition: string;
  wordClass: string;
  thumbnail?: string;
}
