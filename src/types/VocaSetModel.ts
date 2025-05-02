import LessonModel, { LessonWithUserProgress } from "./LessonModel";

export default interface VocaSetModel {
  id: string;
  name: string;
  thumbnail: string;
  target: string;
  description: string|null;
  
  tags: string[];

  topics: LessonModel[];
  topicsCount: number;
  userCount: number;
}

export interface VocaSetWithUserProgress extends VocaSetModel {
  topics: LessonWithUserProgress[];
}
