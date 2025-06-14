export interface ToeicChatHistory {
  id: number;
  toeicTestAttemptId: number;
  questionId: number;
  createdAt: string;

  chatContents: ToeicChatContent[];
}

export interface ToeicChatContent {
  id: number;
  toeicChatHistoryId: number;
  createdAt: string;

  parts: ChatPart[];
  role: "user" | "model";
}

interface ChatPart {
  text: string | ChatBotTextResponse;
}

// export interface TextResponseObj {
//   text: string;
//   type: "text";
// }

export interface OptionResponseObj {
  text: string;
  options: string[];
  type: "option";
}

export type ChatBotTextResponse = OptionResponseObj;
