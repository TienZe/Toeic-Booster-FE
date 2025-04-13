import axiosClient from "../../../../axios";
import { Tag } from "../../../toeic-exam/types/Tags";
import { IExamSetResponse } from "../types/Exam";
import { ExamResponse } from "../types/ExamResponse";
import NewExamRequest from "../types/NewExamRequest";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME);

  try {
    const isAudio = file.type.startsWith("audio/");
    const endpoint = isAudio
      ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

const fetchAllExam = async (
  tagId?: string,
  page: number = 1,
  limit: number = 12,
  search?: string,
) => {
  const url = `test?${tagId ? `tag_id=${tagId}` : ""}${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${search ? `&search=${search}` : ""}`;
  const response = await axiosClient.get<IExamSetResponse>(url);
  return response.data;
};

const fetchExamById = async (examId: string) => {
  const response = await axiosClient.get<ExamResponse>(`test/${examId}`);
  return response.data;
};

const createExam = async (data: NewExamRequest) => {
  const response = await axiosClient.post(`test`, data);
  return response.data;
};

const getListPart = async () => {
  return await axiosClient.get(`part`);
};

const fetchListTags = async () => {
  const response = await axiosClient.get<Tag[]>(`tag?type=test_type`);
  return response.data;
};

const updateGroupQuestion = async (id: string, data: any) => {
  const response = await axiosClient.patch(`group-question/${id}`, { ...data });
  return response.data;
};

const updateNameExam = async (id: string, data: any) => {
  const response = await axiosClient.patch(`test/${id}`, { ...data });
  return response.data;
};

const deleteEntireExam = async (id: string) => {
  const response = await axiosClient.delete(`test/${id}`);
  return response.data;
};

export {
  uploadFile,
  createExam,
  getListPart,
  fetchAllExam,
  fetchExamById,
  fetchListTags,
  updateGroupQuestion,
  updateNameExam,
  deleteEntireExam,
};
