export interface TestStatistics {
  testPracticeCount: number;
  totalTest: number;
  totalTime: number;
  totalQuestion: number;
  totalAnswerCorrect: number;
  maxScore: number;
  listen: SectionStatistics;
  read: SectionStatistics;
}

export interface SectionStatistics {
  totalTest: number;
  totalQuestion: number;
  totalAnswerCorrect: number;
  maxScore: number;
  avgScore: number;
}
