import { ExamStatus } from "../../../types/ToeicExam";

export interface GetToeicExamsRequest {
  page?: number;
  limit?: number;
  search?: string;
  filteredCategory?: number;
  filteredStatus?: ExamStatus;
}
