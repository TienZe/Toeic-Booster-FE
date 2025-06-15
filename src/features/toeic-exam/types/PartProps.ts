import { QuestionGroup } from "../../../types/ToeicExam";

export interface PartProps {
  mode?: string;
  questionGroups?: QuestionGroup[];

  onAssistant?: (questionId: number, questionNumber: number) => void;

  handleNotedQuestion?: (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => void;
  isNotedQuestion?: (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => boolean;
}
