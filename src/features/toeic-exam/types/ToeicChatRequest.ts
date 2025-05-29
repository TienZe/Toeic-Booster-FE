export interface ToeicChatRequest {
  questionId: number;
  toeicTestAttemptId: number;
  text: string;
}

export interface GetToeicChatHistoryRequest {
  questionId: number;
  toeicTestAttemptId: number;
}
