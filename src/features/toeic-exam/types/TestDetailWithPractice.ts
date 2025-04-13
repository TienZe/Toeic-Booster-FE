export interface TestDetailWithPractice {
  test: {
    id: string;
    name: string;
    time: number;
    taken: number;
    commentCount: number;
  };
  testPractice: TestPractice[];
}

export interface TestPractice {
  id: string;
  createdAt: string;
  time: number;
  LCScore: number;
  RCScore: number;
  isFullTest: number;
  totalQuestion: number;
  numCorrect: number;
  listPart: string[];
}
