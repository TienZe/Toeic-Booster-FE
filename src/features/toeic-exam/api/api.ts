import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ToeicExam } from "../../../types/ToeicExam";
import { PracticeDetailResponse } from "../types/PracticeDetailResponse";
import { SaveToeicTestAttemptRequest } from "../types/PracticeRequest";
import { TestDetailWithPractice } from "../types/TestDetailWithPractice";

export async function postToeicTestAttempt(
  practiceRequest: SaveToeicTestAttemptRequest,
) {
  const response = await axiosClient.post(
    `toeic-test-attempts`,
    practiceRequest,
  );
  return response.data.data;
}

const fetchPracticeDetailUser = async (reviewId: string) => {
  const response = await axiosClient.get<PracticeDetailResponse>(
    `test-practice/${reviewId}`,
  );
  return response.data;
};

const fetchTestDetailWithPractice = async (testId: string) => {
  const response = await axiosClient.get<TestDetailWithPractice>(
    `test/${testId}/user`,
  );
  return response.data;
};

export async function getToeicExamInfo(id: number) {
  const response = await axiosClient.get<ApiResponse<ToeicExam>>(
    `toeic-tests/${id}/info`,
  );

  return response.data.data;
}

export { fetchPracticeDetailUser, fetchTestDetailWithPractice };
