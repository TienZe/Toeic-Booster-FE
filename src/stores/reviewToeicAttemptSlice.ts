import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Part } from "../types/ToeicExam";
import { getPartOfQuestionNumber } from "../utils/toeicExamHelper";

export interface ReviewToeicAttemptState {
  questionId: number | null;
  attemptId: number | null;
  showChatBox: boolean;
  attemptSelectedParts: Part[];
  focusQuestionNumber: number | null;
  activePart: Part; // active toeic part that currently displayed
}

const initialState: ReviewToeicAttemptState = {
  questionId: null,
  attemptId: null,
  showChatBox: false,
  attemptSelectedParts: [],
  focusQuestionNumber: null,
  activePart: "part1",
};

const reviewToeicAttemptSlice = createSlice({
  name: "reviewToeicAttempt",
  initialState: initialState,
  reducers: {
    setQuestion(
      state,
      action: PayloadAction<{
        questionId: number;
        attemptId: number;
        attemptSelectedParts: Part[];
      }>,
    ) {
      const { questionId, attemptId, attemptSelectedParts } = action.payload;

      state.questionId = questionId;
      state.attemptId = attemptId;
      state.attemptSelectedParts = attemptSelectedParts;
    },

    clear(state) {
      state.questionId = null;
      state.attemptId = null;
      state.showChatBox = false;
      state.attemptSelectedParts = [];
      state.focusQuestionNumber = null;
      state.activePart = "part1";
    },

    setShowChatBox(state, action: PayloadAction<boolean>) {
      state.showChatBox = action.payload;
    },

    setFocusQuestionNumber(state, action: PayloadAction<number>) {
      state.focusQuestionNumber = action.payload;
      state.activePart = getPartOfQuestionNumber(action.payload);
    },

    setActivePart(state, action: PayloadAction<Part>) {
      state.activePart = action.payload;
      state.focusQuestionNumber = null;
    },
  },
});

export const reviewToeicAttemptActions = reviewToeicAttemptSlice.actions;

export default reviewToeicAttemptSlice.reducer;
