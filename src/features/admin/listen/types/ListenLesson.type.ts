export interface CreateListenLesson {
  name: string;
  audio?: string;
  audioUrl?: string;
  listenSentences?: CreateListenSentence[];
}
export interface CreateListenSentence {
  sentence: string;
  audio?: string;
  audioUrl?: string;
  index: number;
}

export interface GetListenLesson extends CreateListenLesson {
  id: string;
  listenSentences?: GetListenSentence[];
}

export interface GetListenSentence extends CreateListenSentence {
  id: string;
}

export interface UpdateListenLesson extends CreateListenLesson {
  id: string;
  listenSentences?: UpdateListenSentence[];
}

export interface UpdateListenSentence extends CreateListenSentence {
  id?: string;
}
