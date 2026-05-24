import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import app_menusReducer from "./menuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app_menus: app_menusReducer,
  },
});
