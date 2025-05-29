import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssistantQuestionState {
  questionId: number | null;
  attemptId: number | null;
}

const initialState: AssistantQuestionState = {
  questionId: null,
  attemptId: null,
};

const assistantQuestionSlice = createSlice({
  name: "assistantQuestion",
  initialState: initialState,
  reducers: {
    setQuestion(
      state,
      action: PayloadAction<{
        questionId: number;
        attemptId: number;
      }>,
    ) {
      const { questionId, attemptId } = action.payload;
      state.questionId = questionId;
      state.attemptId = attemptId;
    },
    clearQuestion(state) {
      state.questionId = null;
      state.attemptId = null;
    },
  },
});

export const assistantQuestionActions = assistantQuestionSlice.actions;

export default assistantQuestionSlice.reducer;
