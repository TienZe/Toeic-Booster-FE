export interface ToeicChatRequest {
  toeicChatHistoryId: number;
  text: string;
  contextQuestionNumber?: number | null;
}

export interface GetToeicChatHistoryRequest {
  questionId: number;
  toeicTestAttemptId: number;
}
