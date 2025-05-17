import { QuestionGroup } from "../../../../types/ToeicExam";

export default interface NewExamRequest {
  name: string;
  // tags: { id: string; name: string }[];
  questionGroups: QuestionGroup[];
}
