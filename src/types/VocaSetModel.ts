import { CollectionTag } from "./CollectionTag";
import { LessonWithUserProgress } from "./Lesson";

export default interface VocaSetModel {
  id: string;
  name: string;
  thumbnail: string|null;
  description: string|null;
  
  tags: CollectionTag[];

  lessonsCount?: number;

  topicsCount: number;
  userCount: number;
}

export interface VocaSetWithUserProgress extends VocaSetModel {
  topics: LessonWithUserProgress[];
}
