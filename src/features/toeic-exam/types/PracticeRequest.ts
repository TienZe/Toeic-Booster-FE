export interface PracticeRequest {
  userId: string;
  testId: string;
  time: number;
  isFullTest: boolean;
  userAnswer: { idQuestion: string; answer: string }[];
}
