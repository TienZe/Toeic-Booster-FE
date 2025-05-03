import axiosClient from "../../../../axios";
import VocaSetModel from "../../../../types/VocaSetModel";
import UpdateVocaSetRequest from "../types/UpdateVocaSetRequest";

export async function createVocaSet(data: {
  name: string;
  tags: string[];
  thumbnail?: string;
}) {
  const response = await axiosClient.post<VocaSetModel>("/collections", data);

  return response.data;
}

export async function getVocaSetById(id: string) {
  const response = await axiosClient.get<VocaSetModel>(`/collections/${id}`);

  return response.data;
}

export async function updateVocaSet(data: UpdateVocaSetRequest) {
  const response = await axiosClient.put<VocaSetModel>(
    `/collections/${data.id}`,
    data,
  );

  return response.data;
}

export async function deleteVocaSet(id: string) {
  const response = await axiosClient.delete(`/collections/${id}`);

  return response.data;
}
