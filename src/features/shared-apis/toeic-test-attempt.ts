import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import PaginatedData from "../../types/PaginatedData";
import { ToeicTestAttempt } from "../../types/ToeicExam";
import { GetAttemptDetailsRequest } from "./types/GetAttemptDetailsRequest";
import { GetAttemptsRequest } from "./types/GetAttemptsRequest";

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

export async function getAttempts(request: GetAttemptsRequest) {
  const response = await axiosClient.get<
    ApiResponse<PaginatedData<ToeicTestAttempt>>
  >(`toeic-test-attempts`, {
    params: request,
  });

  return response.data.data;
}
