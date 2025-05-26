export interface SaveToeicTestAttemptRequest {
  userId: number;
  toeicTestId: number;
  takenTime: number; // in seconds
  selectedParts: string; // comma separated values
  userAnswers: {
    questionId: number;
    choice: string;
  }[];
}
