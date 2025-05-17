export interface QuestionGroup {
  id: string;
  part: string;
  transcript: string;

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
  correctAnswer: string | null;
}

export interface QuestionMedia {
  id: number;
  fileUrl: string;
  order?: number;
  fileType: string;
}

export function answerIndexToLabel(index: number) {
  return ["A", "B", "C", "D"][index] as "A" | "B" | "C" | "D";
}
