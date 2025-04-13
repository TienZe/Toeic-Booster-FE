import axiosClient from "../../../axios";
import { IListenGroupResponse } from "../types/ListenGroup.type";
// import { Tag } from "../../../toeic-exam/types/Tags";
// import { IExamSetResponse } from "../types/Exam";
// import { ExamResponse } from "../types/ExamResponse";
// import NewExamRequest from "../types/NewExamRequest";

const fetchAllListenGroup = async (
  tabValue: string,
  searchValue: string,
  page: number = 1,
  limit: number = 10,
) => {
  const response = await axiosClient.get<IListenGroupResponse>(
    `listen-group?${tabValue ? `level=${tabValue}` : ""}${searchValue ? `&search=${searchValue}` : ""}${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  );
  return response.data;
};

// const fetchExamById = async (examId: string) => {
//   const response = await axiosClient.get<ExamResponse>(`test/${examId}`);
//   return response.data;
// };

// const createExam = async (data: NewExamRequest) => {
//   const response = await axiosClient.post(`test`, data);
//   return response.data;
// };

// const getListPart = async () => {
//   return await axiosClient.get(`part`);
// };

// const fetchListTags = async () => {
//   const response = await axiosClient.get<Tag[]>(`tag?type=test_type`);
//   return response.data;
// };

export { fetchAllListenGroup };
