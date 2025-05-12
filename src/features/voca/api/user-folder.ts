import axiosClient from "../../../axios";
import { UserFolder } from "../../../types/user-folder";
import VocabularyModel from "../../../types/VocabularyModel";
import PinNewWordToExistingFolderRequest from "../types/PinNewWordToExistingFolderRequest";
import {
  NewUserFolderRequest,
  UpdateFolderRequest,
  UpdateWordOfFolderRequest,
} from "../types/UserFolderRequest";

export async function createNewFolder(request: NewUserFolderRequest) {
  const response = await axiosClient.post<UserFolder>("user-topic", request);

  return response.data;
}

export async function updateFolderDetails(request: UpdateFolderRequest) {
  const { id, ...data } = request;
  const response = await axiosClient.patch<UserFolder>(
    "user-topic/" + id,
    data,
  );

  return response.data;
}

export async function deleteUserFolder(id: string) {
  const response = await axiosClient.delete<UserFolder>("user-topic/" + id);

  return response.data;
}

export async function getUserFolders() {
  const response = await axiosClient.get<UserFolder[]>("user-topic");

  return response.data;
}

export async function getUserFolderById(id: string) {
  const response = await axiosClient.get<UserFolder[]>("user-topic/" + id);

  return response.data[0]; // api returns an array that contains the requested folder
}

export async function pinWordToFolder(folderId: string, vocaId: number) {
  const response = await axiosClient.post<UserFolder>(
    `user-topic/${folderId}/word/${vocaId}`,
  );

  return response.data;
}

export async function pinWordToNewFolder(
  request: NewUserFolderRequest,
  vocaId: number,
) {
  const folder = await createNewFolder(request);

  const updatedFolder = await pinWordToFolder(folder.id, vocaId);

  return updatedFolder;
}

export async function pinNewWordToExistingFolder(
  request: PinNewWordToExistingFolderRequest,
) {
  const { folderId, ...body } = request;
  const response = await axiosClient.post<UserFolder>(
    `word/user-topic/${folderId}`,
    body,
  );

  return response.data;
}

export async function unpinWordFromFolder(folderId: string, vocaId: string) {
  const response = await axiosClient.delete(
    `user-topic/${folderId}/word/${vocaId}`,
  );

  return response.data;
}

export async function updateWordOfFolder(request: UpdateWordOfFolderRequest) {
  const { wordId, ...data } = request;
  const response = await axiosClient.patch<VocabularyModel>(
    "word/" + wordId,
    data,
  );

  return response.data;
}
