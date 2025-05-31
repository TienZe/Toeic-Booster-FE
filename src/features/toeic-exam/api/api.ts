import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ToeicExam, ToeicTestAttempt } from "../../../types/ToeicExam";
import { SaveToeicTestAttemptRequest } from "../types/PracticeRequest";
import { ToeicAttemptStats } from "../types/toeic-exam";

export async function postToeicTestAttempt(
  practiceRequest: SaveToeicTestAttemptRequest,
) {
  const response = await axiosClient.post<ApiResponse<ToeicTestAttempt>>(
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

export async function getAttemptStats(recentDays: string = "30d") {
  const response = await axiosClient.get<ApiResponse<ToeicAttemptStats>>(
    `toeic-test-attempts/stats`,
    {
      params: {
        recentDays,
      },
    },
  );

  return response.data.data;
}
