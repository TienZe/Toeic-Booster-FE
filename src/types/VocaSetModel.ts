import LessonModel, { LessonWithUserProgress } from "./LessonModel";

export default interface VocaSetModel {
  id: string;
  name: string;
  level: string;
  thumbnail: string;
  target: string;
  description: string;

  topics: LessonModel[];
  topicsCount: number;
  userCount: number;
}

export interface VocaSetWithUserProgress extends VocaSetModel {
  topics: LessonWithUserProgress[];
}
