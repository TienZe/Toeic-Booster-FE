import { RoleEnum } from "../../../../types/auth";

export interface UpdateUserProfileRequest {
  userId: string;
  email?: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateUserPasswordRequest {
  userId: string;
  password: string;
  passwordConfirm: string;
}

export interface ChangeRoleOfUserRequest {
  userId: string;
  roles: RoleEnum[];
}

export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  filteredStatus?: string;
}
