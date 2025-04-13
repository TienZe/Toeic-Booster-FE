import { partData } from "./examType";

export default interface NewExamRequest {
  name: string;
  tags: { id: string; name: string }[];
  partData: partData[];
}
