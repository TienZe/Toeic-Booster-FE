import axiosClient from "../../../../axios";

import UpdateListenGroupRequest, {
  ListenGroupModel,
} from "../types/ListListenGroup.type";

export async function createListenGroup(data: { name: string; level: string }) {
  const response = await axiosClient.post<ListenGroupModel>(
    "/listen-group",
    data,
  );

  return response.data;
}
export async function getListenGroupById(id: string) {
  const response = await axiosClient.get<ListenGroupModel>(
    `/listen-group/${id}`,
  );

  return response.data;
}

export async function updateListenGroup(data: UpdateListenGroupRequest) {
  const response = await axiosClient.patch<ListenGroupModel>(
    `/listen-group/${data.id}`,
    data,
  );

  return response.data;
}

export async function deleteListenGroup(id: string) {
  const response = await axiosClient.delete(`/listen-group/${id}`);

  return response.data;
}
