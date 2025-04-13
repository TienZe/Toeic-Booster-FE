import { Tag } from "./Tags";

export interface PracticeDetailResponse {
  test: TestDetailResponse;
  testPractice: TestPracticeDetailResponse;
}

export interface TestDetailResponse {
  id: string;
  name: string;
  time?: number;
  tags?: Tag[];
  groupQuestions: groupQuestionDetailResponse[];
}

export interface groupQuestionDetailResponse {
  id: string;
  detail?: string;
  describeAnswer?: string;
  questions: questionDetailResponse[];
  questionMedia: questionMediaDetailResponse[];
  part: partDetailResponse;
  audio: AudioDetailResponse[];
  image: ImageDetailResponse[];
  transcript?: string;
}

export interface questionDetailResponse {
  id: string;
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer: string;
  explain: string;
  userAnswer?: UserAnswerDetailResponse[];
}

export interface UserAnswerDetailResponse {
  id: string;
  userAnswer: string;
  isCorrect: boolean;
  question: questionDetailResponse;
}

export interface questionMediaDetailResponse {
  id: string;
  type: string;
  url: string;
  index: number;
}

export interface partDetailResponse {
  id: string;
  name: string;
  key: string;
  totalQuestion: number;
}

export interface AudioDetailResponse {
  id: string;
  type: string;
  url: string;
  index: number | null;
}

export interface ImageDetailResponse {
  id: string;
  type: string;
  url: string;
  index: number | null;
}

export interface TestPracticeDetailResponse {
  id: string;
  time: number;
  LCScore: number;
  RCScore: number;
  isFullTest: boolean;
  totalQuestion: number;
  numCorrect: number;
}
