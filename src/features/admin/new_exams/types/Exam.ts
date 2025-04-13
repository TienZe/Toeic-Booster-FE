import { Tag } from "../../../toeic-exam/types/Tags";
import { partData } from "./examType";

export interface IExamModel {
  id: string;
  name: string;
  tags: Tag[];
  time: number;
  taken: number;
  commentCount: number;
  partData: partData[];
}

export interface IExamSetResponse {
  first: number;
  last: number;
  limit: number;
  total: number;
  data: IExamModel[];
}
