import axiosClient from "../../../../axios";
import ApiResponse from "../../../../types/ApiResponse";
import { User } from "../../../../types/auth";
import PaginatedData from "../../../../types/PaginatedData";
import { GetUsersRequest, AdminUpdateUserRequest } from "../types/Request";

export async function getUsers($request: GetUsersRequest) {
  const response = await axiosClient.get<ApiResponse<PaginatedData<User>>>(
    "admin/users",
    {
      params: $request,
    },
  );

  return response.data.data;
}

export async function updateUser(request: AdminUpdateUserRequest) {
  const { userId, ...data } = request;
  const response = await axiosClient.put<ApiResponse<User>>(
    "admin/users/" + userId,
    data,
  );

  return response.data.data;
}

export async function deleteUser(userId: string) {
  const response = await axiosClient.delete("admin/users/" + userId);

  return response.data;
}
