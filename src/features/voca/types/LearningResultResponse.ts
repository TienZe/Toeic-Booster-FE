import VocabularyModel from "../../../types/VocabularyModel";

export type LearningResult = {
  id: string;
  numCorrect: number;
  totalWord: number;
  time: number;
  topic: {
    id: string;
    name: string;
    thumbnail: string;
  };
  correctWord: VocabularyModel[];
  incorrectWord: VocabularyModel[];
};

export type LearningResultResponse = {
  current: LearningResult;
  last: LearningResult;
  max: LearningResult;
};
