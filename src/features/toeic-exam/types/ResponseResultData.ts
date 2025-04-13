export interface ResponseResultData {
  id: string;
  LCScore: number;
  RCScore: number;
  numCorrect: number;
  testId: string;
  time: number;
  totalQuestion: number;
  userAnswer: UserAnswer[];
  userId: string;
}

interface UserAnswer {
  idQuestion: string;
  answer: string;
}
