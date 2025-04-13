import { IListenLesson } from "./ListenLesson.type";

export interface IListenGroupResponse {
  first: number;
  last: number;
  limit: number;
  total: number;
  data: IListenGroupModel[];
}

export interface IListenGroupModel {
  id: string;
  name: string;
  level: string;
  listenLessons: IListenLesson[];
}

export interface IListenGroupSetInfor {
  id: string;
  name: string;
  level: string;
  listenLessons: IListenLessonSetInfor[];
}

interface IListenLessonSetInfor {
  id: string;
  name: string;
}
