import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleShowCategories: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleShowCategories } = themeSlice.actions;

export default themeSlice.reducer;
