export interface UpdateExamReq {
  id?: string;
  detail: string;
  transcript: string;
  describeAnswer?: string;
  questionData: QuestionData[];
  audioUrl: string;
  image: ImageData[];
}

export interface QuestionData {
  id: string;
  questionNumber: number;
  question: string;
  answer: string[];
  correctAnswer: string;
  explain: string;
}

export interface ImageData {
  id?: string;
  fileUrl: string;
  index: number;
}
