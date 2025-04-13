import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpandedScript {
  part: number;
  groupIndex: number;
  isExpanded: boolean;
}
interface SelectedScript {
  expandedScript: ExpandedScript[];
}

const initialState: SelectedScript = {
  expandedScript: [],
};

const selectedScript = createSlice({
  name: "selectedScript",
  initialState,
  reducers: {
    setScript: (
      state,
      action: PayloadAction<{
        part: number;
        groupIndex: number;
      }>,
    ) => {
      const { part, groupIndex } = action.payload;
      const index = state.expandedScript.findIndex(
        (item) => item.part === part && item.groupIndex === groupIndex,
      );
      if (index !== -1) {
        const updatedItems = [...state.expandedScript];
        updatedItems[index] = {
          ...updatedItems[index],
          isExpanded: !updatedItems[index].isExpanded,
        };
        return { ...state, expandedScript: updatedItems };
      }
      return {
        ...state,
        expandedScript: [
          ...state.expandedScript,
          { ...action.payload, isExpanded: true },
        ],
      };
    },
  },
});

export const { setScript } = selectedScript.actions;

export default selectedScript.reducer;
