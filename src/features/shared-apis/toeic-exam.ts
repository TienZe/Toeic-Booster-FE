import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import PaginatedData from "../../types/PaginatedData";
import { ToeicExam } from "../../types/ToeicExam";
import { GetToeicExamsRequest } from "./types/GetToeicExamsRequest";

export async function getToeicExams(request: GetToeicExamsRequest) {
  const response = await axiosClient.get<ApiResponse<PaginatedData<ToeicExam>>>(
    `toeic-tests`,
    { params: request },
  );

  return response.data.data;
}

// Get toeic exam with its question groups
export async function getToeicExamById(examId: number | string) {
  const response = await axiosClient.get<ApiResponse<ToeicExam>>(
    `toeic-tests/${examId}`,
  );

  return response.data.data;
}
