import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonVocabulary } from "../types/LessonVocabulary";

export interface LessonVocaFilteringState {
  lessonId: number | null;
  filteredLessonVocabularies: LessonVocabulary[];
}

const initialState: LessonVocaFilteringState = {
  lessonId: null,
  filteredLessonVocabularies: [],
};

const lessonVocaFilteringSlice = createSlice({
  name: "lessonVocaFiltering",
  initialState: initialState,
  reducers: {
    setFilteredLessonVocabularies(
      state,
      action: PayloadAction<{
        lessonId: number;
        filteredLessonVocabularies: LessonVocabulary[];
      }>,
    ) {
      const { filteredLessonVocabularies, lessonId } = action.payload;
      state.lessonId = lessonId;
      state.filteredLessonVocabularies = filteredLessonVocabularies;
    },
    clearFilteredLessonVocabularies(state) {
      state.lessonId = null;
      state.filteredLessonVocabularies = [];
    },
  },
});

export const lessonVocaFilteringActions = lessonVocaFilteringSlice.actions;

export default lessonVocaFilteringSlice.reducer;
