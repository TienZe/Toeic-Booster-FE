export interface NewUserFolderRequest {
  name: string;
  description: string | null;
}

export interface UpdateFolderRequest {
  folderId: number;
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
