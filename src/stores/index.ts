import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import selectedPartsReducer from "./selectedPartsSlice";
import userAnswerReducer from "./userAnswer";
import folderPracticeReducer from "./folderPracticeSlice";

import seletedScript from "./selectedScript";
import notedQuestions from "./notedQuestionSlice";
import globalMessageReducer from "./globalMessageSlice";
import lessonVocaFilteringReducer from "./lessonVocaFilteringSlice";
import reviewToeicAttemptReducer from "./reviewToeicAttemptSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,

    lessonVocaFiltering: lessonVocaFilteringReducer,

    selectedParts: selectedPartsReducer,
    userAnswers: userAnswerReducer,
    folderPractice: folderPracticeReducer,

    seletedScript: seletedScript,
    notedQuestions: notedQuestions,
    globalMessage: globalMessageReducer,
    reviewToeicAttempt: reviewToeicAttemptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
