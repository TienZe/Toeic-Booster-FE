import axiosClient from "../../../../axios";
import ApiResponse from "../../../../types/ApiResponse";
import VocaSetModel from "../../../../types/VocaSetModel";
import UpdateVocaSetRequest from "../types/UpdateVocaSetRequest";

export async function createVocaSet(data: {
  name: string;
  tags: string[];
  thumbnail?: string;
}) {
  const response = await axiosClient.post<ApiResponse<VocaSetModel>>(
    "/collections",
    data,
  );

  return response.data.data;
}

export async function getVocaSetById(id: string) {
  const response = await axiosClient.get<ApiResponse<VocaSetModel>>(
    `/collections/${id}`,
  );

  return response.data.data;
}

export async function updateVocaSet(data: UpdateVocaSetRequest) {
  const response = await axiosClient.put<ApiResponse<VocaSetModel>>(
    `/collections/${data.id}`,
    data,
  );

  return response.data.data;
}

export async function deleteVocaSet(id: string) {
  const response = await axiosClient.delete(`/collections/${id}`);

  return response.data.data;
}
