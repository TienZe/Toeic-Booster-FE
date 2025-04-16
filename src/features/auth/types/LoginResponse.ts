import { User } from "../../../types/auth";

export default interface LoginResponse {
  token: string;
  user: User;
}