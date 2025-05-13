import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { UserFolder } from "../../../types/user-folder";
import VocabularyModel from "../../../types/VocabularyModel";
import { attachNewWordsToLesson } from "../../shared-apis/lesson-vocabulary-api";
import PinNewWordToExistingFolderRequest from "../types/PinNewWordToExistingFolderRequest";
import {
  NewUserFolderRequest,
  UpdateFolderRequest,
  UpdateWordOfFolderRequest,
} from "../types/UserFolderRequest";

export async function createNewFolder(request: NewUserFolderRequest) {
  const response = await axiosClient.post<ApiResponse<UserFolder>>(
    "word-folders",
    request,
  );

  return response.data.data;
}

export async function getUserFolders() {
  const response =
    await axiosClient.get<ApiResponse<UserFolder[]>>("word-folders");

  return response.data.data;
}

export async function getUserFolderById(folderId: number) {
  const response = await axiosClient.get<ApiResponse<UserFolder[]>>(
    "word-folders/" + folderId,
  );

  return response.data.data;
}

export async function updateFolderDetails(request: UpdateFolderRequest) {
  const { folderId, ...data } = request;
  const response = await axiosClient.put<ApiResponse<UserFolder>>(
    "word-folders/" + folderId,
    data,
  );

  return response.data.data;
}

export async function deleteUserFolder(folderId: number) {
  const response = await axiosClient.delete<ApiResponse<unknown>>(
    "word-folders/" + folderId,
  );

  return response.data.data;
}

export async function pinWordToNewFolder(
  request: NewUserFolderRequest,
  vocaId: number,
) {
  const folder = await createNewFolder(request);

  const updatedFolder = await attachNewWordsToLesson({
    lessonId: folder.id,
    wordIds: [vocaId],
  });

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

export async function updateWordOfFolder(request: UpdateWordOfFolderRequest) {
  const { wordId, ...data } = request;
  const response = await axiosClient.patch<VocabularyModel>(
    "word/" + wordId,
    data,
  );

  return response.data;
}
