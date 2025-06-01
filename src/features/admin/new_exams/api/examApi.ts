import axiosClient from "../../../../axios";
import ApiResponse from "../../../../types/ApiResponse";
import { ToeicExam } from "../../../../types/ToeicExam";
import { ExamResponse } from "../types/ExamResponse";
import NewExamRequest from "../types/NewExamRequest";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";

const fetchExamById = async (examId: string) => {
  const response = await axiosClient.get<ExamResponse>(`test/${examId}`);
  return response.data;
};

const createExam = async (data: NewExamRequest) => {
  const response = await axiosClient.post<ApiResponse<ToeicExam>>(
    `toeic-tests`,
    data,
  );
  return response.data.data;
};

const deleteEntireExam = async (id: string) => {
  const response = await axiosClient.delete(`test/${id}`);
  return response.data;
};

export async function saveExam(request: Partial<SaveToeicTestRequest>) {
  const response = await axiosClient.post<ApiResponse<ToeicExam>>(
    `toeic-tests`,
    request,
  );

  return response.data.data;
}

export { createExam, fetchExamById, deleteEntireExam };
