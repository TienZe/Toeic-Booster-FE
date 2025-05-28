import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ToeicExam, ToeicTestAttempt } from "../../../types/ToeicExam";
import { GetAttemptsRequest } from "../types/GetAttemptsRequest";
import { SaveToeicTestAttemptRequest } from "../types/PracticeRequest";

export async function postToeicTestAttempt(
  practiceRequest: SaveToeicTestAttemptRequest,
) {
  const response = await axiosClient.post(
    `toeic-test-attempts`,
    practiceRequest,
  );
  return response.data.data;
}

export async function getToeicExamInfo(id: number) {
  const response = await axiosClient.get<ApiResponse<ToeicExam>>(
    `toeic-tests/${id}/info`,
  );

  return response.data.data;
}

export async function getAttempts(request: GetAttemptsRequest) {
  const response = await axiosClient.get<ApiResponse<ToeicTestAttempt[]>>(
    `toeic-test-attempts`,
    {
      params: request,
    },
  );

  return response.data.data;
}
