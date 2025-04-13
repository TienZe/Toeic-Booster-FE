export interface PracticeDetailConverted {
  name: string;
  tags: { id: string; name: string }[];
  partData: partDataConverted[];
}

export interface partDataConverted {
  part: string;
  groupQuestionData: groupQuestionDataConverted[];
}

export interface groupQuestionDataConverted {
  audioUrl?: string | null;
  audioPreview?: string;
  image?: { fileUrl: string; index: number }[];
  imagePreview?: string[];
  questionData: questionDataConverted[];
}

export interface questionDataConverted {
  questionId?: string;
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer?: string;
  userAnswer?: UserAnswer;
  explain: string;
}

export interface UserAnswer {
  id: string | null;
  userAnswer: string | null;
  isCorrect: boolean | null;
}

export interface part {
  id: string;
  name: string;
  key: string;
  totalQuestion: number;
}
