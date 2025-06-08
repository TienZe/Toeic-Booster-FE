import { UserStatus } from "../../../../types/auth";

export interface AdminUpdateUserRequest {
  userId: string;
  name?: string;
  avatar?: string;
  status?: UserStatus;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  filteredStatus?: string;
}
