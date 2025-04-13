import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAnswer {
  idQuestion: string;
  answer: string;
}

interface ActiveAnswerState {
  [part: number]: {
    [groupIndex: number]: {
      [questionIndex: number]: number;
    };
  };
}

interface ExpandedItem {
  part: number;
  groupIndex: number;
  questionIndex: number;
  isExpanded: boolean;
}

interface UserAnswersState {
  userAnswers: UserAnswer[];
  activeAnswers: ActiveAnswerState;
  explainAnswers: ExpandedItem[];
}

const initialState: UserAnswersState = {
  userAnswers: [],
  activeAnswers: {},
  explainAnswers: [],
};

const userAnswersSlice = createSlice({
  name: "userAnswers",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<UserAnswer>) => {
      const { idQuestion, answer } = action.payload;
      const existingAnswerIndex = state.userAnswers.findIndex(
        (ans) => ans.idQuestion === idQuestion,
      );

      if (existingAnswerIndex !== -1) {
        state.userAnswers[existingAnswerIndex].answer = answer;
      } else {
        state.userAnswers.push(action.payload);
      }
    },

    setActiveAnswer: (
      state,
      action: PayloadAction<{
        part: number;
        groupIndex: number;
        questionIndex: number;
        answerIndex: number;
      }>,
    ) => {
      const { part, groupIndex, questionIndex, answerIndex } = action.payload;
      if (!state.activeAnswers[part]) {
        state.activeAnswers[part] = {};
      }
      if (!state.activeAnswers[part][groupIndex]) {
        state.activeAnswers[part][groupIndex] = {};
      }
      state.activeAnswers[part][groupIndex][questionIndex] = answerIndex;
    },

    resetAnswers: (state) => {
      state.userAnswers = [];
      state.activeAnswers = {};
    },

    setExplain: (
      state,
      action: PayloadAction<{
        part: number;
        groupIndex: number;
        questionIndex: number;
      }>,
    ) => {
      const { part, groupIndex, questionIndex } = action.payload;
      const index = state.explainAnswers.findIndex(
        (item) =>
          item.part === part &&
          item.groupIndex === groupIndex &&
          item.questionIndex === questionIndex,
      );
      if (index !== -1) {
        const updatedItems = [...state.explainAnswers];
        updatedItems[index] = {
          ...updatedItems[index],
          isExpanded: !updatedItems[index].isExpanded,
        };
        return { ...state, explainAnswers: updatedItems };
      }
      return {
        ...state,
        explainAnswers: [
          ...state.explainAnswers,
          { ...action.payload, isExpanded: true },
        ],
      };
    },
  },
});

export const { setAnswer, resetAnswers, setActiveAnswer, setExplain } =
  userAnswersSlice.actions;
export default userAnswersSlice.reducer;
