import { QuestionGroup } from "../../../../types/ToeicExam";

export default interface NewExamRequest {
  name: string;
  questionGroups: QuestionGroup[];
}
