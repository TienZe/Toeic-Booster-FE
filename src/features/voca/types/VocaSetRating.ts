import { User } from "../../../types/auth";

export interface VocaSetRating {
  id: string;
  rating: number;
  ratingContent: string;
  createdAt: string;

  user: User;
}
