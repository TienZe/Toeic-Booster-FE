import { QuestionGroup } from "../../../../types/ToeicExam";

export interface SaveToeicTestRequest {
  id?: number;
  name?: string;
  category?: number; // category id

  questionGroups: QuestionGroup[];
}
