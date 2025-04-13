import { Tag } from "../../../toeic-exam/types/Tags";

export interface ExamResponse {
  id: string;
  name: string;
  time?: number;
  tags?: Tag[];
  groupQuestions: groupQuestionResponse[];
}

export interface groupQuestionResponse {
  id: string;
  detail?: string;
  transcript?: string;
  describeAnswer?: string;
  questions: questionResponse[];
  questionMedia: questionMediaResponse[];
  part: partResponse;
}

export interface questionResponse {
  id: string;
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer: string;
  explain: string;
}

export interface questionMediaResponse {
  id: string;
  type: string;
  url: string;
  index: number;
}

export interface partResponse {
  id: string;
  name: string;
  key: string;
  totalQuestion: number;
}
