import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: [],
};

const menuSlice = createSlice({
  name: "app_menus",
  initialState,

  reducers: {
    setAppMenus: (state, action) => {
      state.menus = action.payload;
    },
  },
});

export const { setAppMenus } = menuSlice.actions;
export default menuSlice.reducer;
