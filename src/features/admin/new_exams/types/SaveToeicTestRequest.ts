import { QuestionGroup } from "../../../../types/ToeicExam";

export interface SaveToeicTestRequest {
  id?: number;
  name?: string;
  tag?: number;

  questionGroups: QuestionGroup[];
}
