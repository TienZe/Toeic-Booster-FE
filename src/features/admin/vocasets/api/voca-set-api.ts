import axiosClient from "../../../../axios";
import VocaSetModel from "../../../../types/VocaSetModel";
import UpdateVocaSetRequest from "../types/UpdateVocaSetRequest";

export async function createVocaSet(data: {
  name: string;
  level: string;
  thumbnail: string;
}) {
  const response = await axiosClient.post<VocaSetModel>("/group-topic", data);

  return response.data;
}

export async function getVocaSetById(id: string) {
  const response = await axiosClient.get<VocaSetModel>(`/group-topic/${id}`);

  return response.data;
}

export async function updateVocaSet(data: UpdateVocaSetRequest) {
  const response = await axiosClient.patch<VocaSetModel>(
    `/group-topic/${data.id}`,
    data,
  );

  return response.data;
}

export async function deleteVocaSet(id: string) {
  const response = await axiosClient.delete(`/group-topic/${id}`);

  return response.data;
}
