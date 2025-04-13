export interface LastPracticeResponse {
  lastPractice: LastPracticeDetail[];
}

export interface LastPracticeDetail {
  id: string;
  createdAt: Date;
  time: number;
  LCScore: number;
  RCScore: number;
  isFullTest: boolean;
  totalQuestion: number;
  numCorrect: number;
  listPart: string[];
  test: {
    name: string;
  };
}
