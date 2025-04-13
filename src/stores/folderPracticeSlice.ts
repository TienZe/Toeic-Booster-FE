import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFolder } from "../types/user-folder";

export interface FolderPracticeState {
  folder: UserFolder | null; // a folder that user has practiced
  correctVocaIds: string[];
  takenTime: number;
}

const initialState: FolderPracticeState = {
  folder: null,
  correctVocaIds: [],
  takenTime: 0,
};

const folderPracticeSlice = createSlice({
  name: "folderPractice",
  initialState: initialState,
  reducers: {
    savePracticeResult(state, action: PayloadAction<FolderPracticeState>) {
      // redux toolkit will handle immutability
      state.folder = action.payload.folder;
      state.correctVocaIds = action.payload.correctVocaIds;
      state.takenTime = action.payload.takenTime;
    },
  },
});

export const folderPracticeActions = folderPracticeSlice.actions;

export default folderPracticeSlice.reducer;
