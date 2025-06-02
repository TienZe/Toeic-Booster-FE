import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssistantQuestionState {
  questionId: number | null;
  attemptId: number | null;
  showChatBox: boolean;
}

const initialState: AssistantQuestionState = {
  questionId: null,
  attemptId: null,
  showChatBox: false,
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
        showChatBox: boolean;
      }>,
    ) {
      const { questionId, attemptId, showChatBox } = action.payload;
      state.questionId = questionId;
      state.attemptId = attemptId;
      state.showChatBox = showChatBox;
    },
    clearQuestion(state) {
      state.questionId = null;
      state.attemptId = null;
      state.showChatBox = false;
    },
    setShowChatBox(state, action: PayloadAction<boolean>) {
      state.showChatBox = action.payload;
    },
  },
});

export const assistantQuestionActions = assistantQuestionSlice.actions;

export default assistantQuestionSlice.reducer;
