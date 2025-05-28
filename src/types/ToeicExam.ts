export interface QuestionGroup {
  id: string;
  part: string;
  transcript: string | null;
  passage: string | null;

  groupIndex: number;

  questions: Question[];
  medias: QuestionMedia[];
}

export interface Question {
  id: number;
  question: string;
  questionNumber: number;
  explanation: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;

  userAnswer?: UserAnswer;
}

export interface QuestionMedia {
  id: number;
  fileUrl: string;
  order?: number;
  fileType: string;
}

export interface ToeicExam {
  id: number;
  name: string;

  tag?: number;
  questionGroups?: QuestionGroup[];

  commentCount?: number;
  takenStudents?: number;

  createdAt: string;
}

export type Part =
  | "part1"
  | "part2"
  | "part3"
  | "part4"
  | "part5"
  | "part6"
  | "part7";

export type PartData = {
  [key: string]: QuestionGroup[];
};

export interface UserAnswer {
  questionId: number;
  choice: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ToeicTestAttempt {
  id: number;
  takenTime: number;
  selectedParts: Part[];
  isFullTest: boolean;
  createdAt: string;
  score: number;
  listeningScore: number;
  readingScore: number;

  totalQuestions?: number;
  numberOfCorrectQuestions?: number;
  numberOfIncorrectQuestions?: number;
  numCorrectLcQuestions?: number;
  numCorrectRcQuestions?: number;

  toeicTestId: number;
  toeicTest?: ToeicExam;
}
