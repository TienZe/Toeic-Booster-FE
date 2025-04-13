import axiosClient from "../../../axios";
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

export { postPractice, fetchPracticeDetailUser, fetchTestDetailWithPractice };
