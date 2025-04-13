export interface ListenGroupModel {
  id: string;
  name: string;
  level: string;
  listenLessons: ListenLesionModel[];
}
export interface ListenLesionModel {
  id: string;
  name: string;
  audio: string;
  listenSentences: ListenSentenceModel[];
}
export interface ListenSentenceModel {
  id: string;
  sentence: string;
  audio: string;
  index: number;
}

export default interface UpdateListenGroupRequest {
  id: string;
  name?: string;
  level?: string;
}
