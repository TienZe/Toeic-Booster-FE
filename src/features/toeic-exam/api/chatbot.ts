import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ChatBotTextResponse, ToeicChatHistory } from "../types/toeic-chat";
import {
  GetToeicChatHistoryRequest,
  ToeicChatRequest,
} from "../types/ToeicChatRequest";

export async function chat(request: ToeicChatRequest) {
  const response = await axiosClient.post<
    ApiResponse<{ text: ChatBotTextResponse }>
  >("/chat", request);
  return response.data.data;
}

export async function getChatHistory(request: GetToeicChatHistoryRequest) {
  const response = await axiosClient.get<ApiResponse<ToeicChatHistory | null>>(
    `/chat/history/${request.toeicTestAttemptId}/${request.questionId}`,
  );

  return response.data.data;
}
