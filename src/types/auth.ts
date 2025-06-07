export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roleNames: RoleEnum[];

  targetScore: number;
  testDate: string;

  status: UserStatus;

  createdAt: string;
}

export enum RoleEnum {
  Admin = "admin",
  User = "user",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export function canAccessAdminPage(user: User) {
  return user.roleNames.includes(RoleEnum.Admin);
}

export function isAdmin(user: User) {
  return user.roleNames.includes(RoleEnum.Admin);
}

export function getRole(user: User) {
  if (user.roleNames.includes(RoleEnum.Admin)) {
    return RoleEnum.Admin;
  }

  return RoleEnum.User;
}
