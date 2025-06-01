import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { ToeicExam } from "../../../types/ToeicExam";

export async function getMostTakenTests() {
  const response = await axiosClient.get<ApiResponse<ToeicExam[]>>(
    `toeic-tests/most-taken`,
  );
  return response.data.data;
}
