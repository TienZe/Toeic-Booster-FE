export interface ToeicChatRequest {
  toeicChatHistoryId: number;
  text: string;
  contextQuestionNumber?: number | null;
}

export interface GetToeicChatHistoryRequest {
  toeicTestAttemptId: number;
  questionId: number;
}

export interface CreateToeicChatHistoryRequest {
  attemptId: number;
  questionId?: number;
  questionNumber?: number;
}
