import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { User } from "../../../types/auth";

export async function updateUserProfile(data: unknown) {
  const response = await axiosClient.put<ApiResponse<User>>(
    "user/profile",
    data,
  );
  return response.data.data;
}

export async function updatePassword(data: unknown) {
  const response = await axiosClient.patch("auth/updatePassword", data);
  return response.data;
}
