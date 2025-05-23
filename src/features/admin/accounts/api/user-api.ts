import axiosClient from "../../../../axios";
import { User } from "../../../../types/auth";
import {
  ChangeRoleOfUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserProfileRequest,
} from "../types/Request";

export async function getUsers() {
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
}

export async function deactivateUser(userId: string) {
  const response = await axiosClient.patch<User>("/users/deactive/" + userId);

  return response.data;
}

export async function activateUser(userId: string) {
  const response = await axiosClient.patch<User>("/users/active/" + userId);

  return response.data;
}

export async function switchUserStatus(userId: string, activate: boolean) {
  if (activate) {
    return await activateUser(userId);
  }

  return await deactivateUser(userId);
}

export async function updateUserProfile(request: UpdateUserProfileRequest) {
  const { userId, ...data } = request;
  const response = await axiosClient.patch<User>(
    "/users/updateProfile/" + userId,
    data,
  );

  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await axiosClient.delete("/users/" + userId);

  return response.data;
}

export async function updateUserPassword(request: UpdateUserPasswordRequest) {
  const { userId, ...data } = request;
  const response = await axiosClient.patch(
    "/users/updatePassword/" + userId,
    data,
  );

  return response.data;
}

export async function changeRoleOfUser(request: ChangeRoleOfUserRequest) {
  const { userId, roles } = request;
  const response = await axiosClient.patch<User>("/users/roles/" + userId, {
    roles,
  });

  return response.data;
}
