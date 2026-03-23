// slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export type ToolbarButton = {
  id: string;
  label: string;
  actionType: string; // The "key" the page will listen for
  variant?: 'primary' | 'secondary' | 'danger';
};

interface UIState {
  toolbarTitle: string;
  extraButtons: ToolbarButton[];
  isVisible: boolean;
}

const initialState: UIState = {
  toolbarTitle: "Blackinkpaper", // Default Title
  extraButtons: [],        // Default empty
  isVisible:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setToolbar(state, action: PayloadAction<{ title?: string; buttons?: ToolbarButton[]; isVisible?: boolean }>) {
      if (action.payload.title !== undefined) state.toolbarTitle = action.payload.title;
      if (action.payload.buttons !== undefined) state.extraButtons = action.payload.buttons;
      if (action.payload.isVisible !== undefined) state.isVisible = action.payload.isVisible;
    },
    resetToolbar(state) {
      state.toolbarTitle = "Blackinkpaper";
      state.extraButtons = [];
      state.isVisible = false; // Reset to visible for the next page
    }
  }
});

export const { setToolbar, resetToolbar } = uiSlice.actions;
export default uiSlice.reducer;