import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedPartsState {
  selectedParts: string[];
  limitTime: string;
}

const initialState: SelectedPartsState = {
  selectedParts: [],
  limitTime: "0",
};

const selectedPartsSlice = createSlice({
  name: "selectedParts",
  initialState,
  reducers: {
    setSelectedParts: (state, action: PayloadAction<string[]>) => {
      state.selectedParts = action.payload;
    },
    setLimitTime: (state, action: PayloadAction<string>) => {
      state.limitTime = action.payload;
    },
    clearSelectedParts: (state) => {
      state.selectedParts = [];
      state.limitTime = "0";
    },
  },
});

export const { setSelectedParts, setLimitTime, clearSelectedParts } =
  selectedPartsSlice.actions;

export default selectedPartsSlice.reducer;
