export interface ToeicAttemptStats {
  numberOfPracticeTests: number;
  practiceTime: number;

  rc: PartAttemptStats;
  lc: PartAttemptStats;

  numOfCorrectAnswersGroupedByPart: NumOfCorrectGroupedByPart[];
}

interface PartAttemptStats {
  practiceTests: number;
  answers: number;
  correctAnswers: number;
  maxScore: number;
  averageScore: number;
  averageTime: number;
  accuracyByDate: { date: string; accuracy: number }[];
}

interface NumOfCorrectGroupedByPart {
  numCorrect: number;
  total: number;
}
