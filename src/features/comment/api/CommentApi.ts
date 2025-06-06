import axiosClient from "../../../axios";
import { IComment, ISingleComment } from "../types/IComment";

const fetchCommentsByTest = async (testId: number) => {
  const response = await axiosClient.get<IComment[]>(`/comment/test/${testId}`);
  return response.data;
};

const createComment = async (comment: ISingleComment) => {
  const response = await axiosClient.post(`comment`, { ...comment });
  return response.data;
};

export { fetchCommentsByTest, createComment };
