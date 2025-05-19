export interface QuestionGroup {
  id: string;
  part: string;
  transcript: string | null;

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
  correctAnswer: string | null;
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

  createdAt: string;
}

export function answerIndexToLabel(index: number) {
  return ["A", "B", "C", "D"][index] as "A" | "B" | "C" | "D";
}
