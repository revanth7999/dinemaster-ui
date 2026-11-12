import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  environment: null,
  themePreference: "light",
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.environment = action.payload.environment;
      state.themePreference =
        action.payload.themePreference === "dark" ? "dark" : "light";
    },

    setThemePreference: (state, action) => {
      state.themePreference = action.payload === "dark" ? "dark" : "light";
      if (state.user) {
        state.user.themePreference = state.themePreference;
      }
    },

    tokenRefreshed: (state, action) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.environment = null;
      state.themePreference = "light";
    },
  },
});

export const {
  loginSuccess,
  logout,
  setThemePreference,
  tokenRefreshed,
} = authSlice.actions;

export default authSlice.reducer;
