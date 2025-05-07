import axiosClient from "../../../../axios";
import PaginatedData from "../../../../types/PaginatedData";
import VocabularyModel from "../../../../types/VocabularyModel";
import { GetSystemWordsRequest } from "../types/GetSystemWordsRequest";
import CreateVocabularyRequest from "../types/CreateVocabularyRequest";
import UpdateVocabularyRequest from "../types/UpdateVocabularyRequest";

export async function createNewWord(request: CreateVocabularyRequest) {
  const { ...data } = request;
  const response = await axiosClient.post<VocabularyModel>(
    "vocabularies",
    data,
  );

  return response.data;
}

export async function getVocaById(id: string|number) {
  const response = await axiosClient.get<VocabularyModel>(
    "vocabularies/" + id,
  );

  return response.data;
}

export async function getSystemWords(request: GetSystemWordsRequest) {
  const response = await axiosClient.get<PaginatedData<VocabularyModel>>(
    "vocabularies",
    {
      params: request,
    },
  );

  return response.data;
}

export async function updateVoca(request: UpdateVocabularyRequest) {
  const { id, ...data } = request;
  const response = await axiosClient.put<VocabularyModel>("vocabularies/" + id, data);

  return response.data;
}

export async function deleteVoca(id: string) {
  const response = await axiosClient.delete("/word/" + id);

  return response.data;
}

export async function deleteWord(id: string|number) {
  const response = await axiosClient.delete("/vocabularies/" + id);

  return response.data;
}
