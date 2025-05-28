import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import { ToeicTestAttempt } from "../../types/ToeicExam";
import { GetAttemptDetailsRequest } from "./types/GetAttemptDetailsRequest";

export async function getAttemptDetails(
  attemptId: number | string,
  request?: GetAttemptDetailsRequest,
) {
  const response = await axiosClient.get<ApiResponse<ToeicTestAttempt>>(
    `toeic-test-attempts/${attemptId}/details`,
    {
      params: request,
    },
  );
  return response.data.data;
}
