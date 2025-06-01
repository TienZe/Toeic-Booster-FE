import axiosClient from "../../../../axios";
import ApiResponse from "../../../../types/ApiResponse";
import { ToeicExam } from "../../../../types/ToeicExam";
import NewExamRequest from "../types/NewExamRequest";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";

export async function createExam(data: NewExamRequest) {
  const response = await axiosClient.post<ApiResponse<ToeicExam>>(
    `toeic-tests`,
    data,
  );
  return response.data.data;
}

export async function saveExam(request: Partial<SaveToeicTestRequest>) {
  const response = await axiosClient.post<ApiResponse<ToeicExam>>(
    `toeic-tests`,
    request,
  );

  return response.data.data;
}

export async function deleteExam(examId: string | number) {
  const response = await axiosClient.delete<ApiResponse<void>>(
    `toeic-tests/${examId}`,
  );
  return response.data.data;
}
