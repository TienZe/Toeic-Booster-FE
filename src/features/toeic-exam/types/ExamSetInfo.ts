import { Tag } from "./Tags";

export interface ExamSetInfo {
  id: string;
  name: string;
  time: number;
  taken: number;
  commentCount: number;
  tag?: Tag;
}
