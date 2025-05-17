import { User } from "../../../types/auth";

export interface VocaSetRating {
  id: string;
  rate: number;
  personalMessage: string;
  createdAt: string;

  user: User;
}
