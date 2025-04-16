export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // roles: Role[];

  targetScore: number;
  testDate: string;

  createdAt: string;
}

export type Role = "admin" | "user" | "moderator";

export enum RoleEnum {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}

export function canAccessAdminPage(user: User) {
  return (
    user.roles?.includes(RoleEnum.Admin) ||
    user.roles?.includes(RoleEnum.Moderator)
  );
}

export function isAdmin(user: User) {
  return user.roles.includes(RoleEnum.Admin);
}

export function getRole(user: User) {
  if (user.roles.includes(RoleEnum.Admin)) {
    return RoleEnum.Admin;
  }
  if (user.roles.includes(RoleEnum.Moderator)) {
    return RoleEnum.Moderator;
  }
  return RoleEnum.User;
}
