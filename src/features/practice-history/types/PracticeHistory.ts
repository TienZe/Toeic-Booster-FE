export interface PracticeHistory {
  id: string;
  time: number;
  LCScore: number;
  RCScore: number;
  isFullTest: boolean;
  totalQuestion: number;
  numCorrect: number;
  createdAt: string;
  test: {
    id: string;
    name: string;
    time: number;
  };
}
