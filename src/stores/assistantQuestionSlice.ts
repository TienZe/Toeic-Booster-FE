import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Part } from "../types/ToeicExam";

export interface AssistantQuestionState {
  questionId: number | null;
  attemptId: number | null;
  showChatBox: boolean;
  attemptSelectedParts: Part[];
}

const initialState: AssistantQuestionState = {
  questionId: null,
  attemptId: null,
  showChatBox: false,
  attemptSelectedParts: [],
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
        attemptSelectedParts: Part[];
      }>,
    ) {
      const { questionId, attemptId, showChatBox, attemptSelectedParts } =
        action.payload;

      state.questionId = questionId;
      state.attemptId = attemptId;
      state.showChatBox = showChatBox;
      state.attemptSelectedParts = attemptSelectedParts;
    },

    clearQuestion(state) {
      state.questionId = null;
      state.attemptId = null;
      state.showChatBox = false;
      state.attemptSelectedParts = [];
    },

    setShowChatBox(state, action: PayloadAction<boolean>) {
      state.showChatBox = action.payload;
    },
  },
});

export const assistantQuestionActions = assistantQuestionSlice.actions;

export default assistantQuestionSlice.reducer;
