import { UserAnswer } from "./PracticeDetailConverted";

export interface PracticeRequest {
  userId: string;
  testId: string;
  time: number;
  isFullTest: boolean;
  userAnswer: Omit<UserAnswer, "id">[];
}
