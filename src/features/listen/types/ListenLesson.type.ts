import { IListenGroupModel } from "./ListenGroup.type";
import { IListenSentence } from "./ListenSentence.type";

export interface IListenLesson {
  id: string;
  name: string;
  audio: string;
  listenSentences: IListenSentence[];
  listenGroup: IListenGroupModel;
  prev: string;
  next: string;
}
