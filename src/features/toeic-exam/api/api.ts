import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ToeicExam } from "../../../types/ToeicExam";
import { PracticeDetailResponse } from "../types/PracticeDetailResponse";
import { PracticeRequest } from "../types/PracticeRequest";
import { TestDetailWithPractice } from "../types/TestDetailWithPractice";

const postPractice = async (practiceRequest: PracticeRequest) => {
  const response = await axiosClient.post(`test-practice`, practiceRequest);
  return response.data;
};

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

export { postPractice, fetchPracticeDetailUser, fetchTestDetailWithPractice };
