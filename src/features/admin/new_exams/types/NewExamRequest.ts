import { QuestionGroup } from "../../../../types/ToeicExam";

export default interface NewExamRequest {
  name: string;
  category: number;
  questionGroups: QuestionGroup[];
}
