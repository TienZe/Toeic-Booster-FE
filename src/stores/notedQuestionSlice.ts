import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotedQuestion {
  part: number;
  groupIndex: number;
  questionIndex: number;
  isNoted: boolean;
}

interface NotedQuestionState {
  notedQuestions: NotedQuestion[];
}

const initialState: NotedQuestionState = {
  notedQuestions: [],
};

const notedQuestionsSlice = createSlice({
  name: "notedQuestions",
  initialState,
  reducers: {
    setNotedQuestion: (
      state,
      action: PayloadAction<{
        part: number;
        groupIndex: number;
        questionIndex: number;
      }>,
    ) => {
      const { part, groupIndex, questionIndex } = action.payload;
      const index = state.notedQuestions.findIndex(
        (item) =>
          item.part === part &&
          item.groupIndex === groupIndex &&
          item.questionIndex === questionIndex,
      );
      if (index !== -1) {
        const updatedItems = [...state.notedQuestions];
        updatedItems[index] = {
          ...updatedItems[index],
          isNoted: !updatedItems[index].isNoted,
        };
        return { ...state, notedQuestions: updatedItems };
      }
      return {
        ...state,
        notedQuestions: [
          ...state.notedQuestions,
          { ...action.payload, isNoted: true },
        ],
      };
    },

    resetNotedQuestion: (state) => {
      state.notedQuestions = [];
    },
  },
});

export const { setNotedQuestion, resetNotedQuestion } =
  notedQuestionsSlice.actions;

export default notedQuestionsSlice.reducer;
