import axiosClient from "../../../../axios";
import VocabularyModel from "../../../../types/VocabularyModel";
import CreateVocabularyRequest from "../types/CreateVocabularyRequest";
import UpdateVocabularyRequest from "../types/UpdateVocabularyRequest";
import ApiResponse from "../../../../types/ApiResponse";

export async function createNewWord(request: CreateVocabularyRequest) {
  const { ...data } = request;
  const response = await axiosClient.post<ApiResponse<VocabularyModel>>(
    "vocabularies",
    data,
  );

  return response.data.data;
}

export async function getVocaById(id: string|number) {
  const response = await axiosClient.get<ApiResponse<VocabularyModel>>(
    "vocabularies/" + id,
  );

  return response.data.data;
}

export async function updateVoca(request: UpdateVocabularyRequest) {
  const { id, ...data } = request;
  const response = await axiosClient.put<ApiResponse<VocabularyModel>>(
    "vocabularies/" + id,
    data,
  );

  return response.data.data;
}

export async function deleteWord(id: string|number) {
  const response = await axiosClient.delete("/vocabularies/" + id);

  return response.data.data;
}
