import { CollectionTag } from "./CollectionTag";
import LessonModel, { LessonWithUserProgress } from "./LessonModel";

export default interface VocaSetModel {
  id: string;
  name: string;
  thumbnail: string|null;
  description: string|null;
  
  tags: CollectionTag[];

  topics: LessonModel[];
  topicsCount: number;
  userCount: number;
}

export interface VocaSetWithUserProgress extends VocaSetModel {
  topics: LessonWithUserProgress[];
}
