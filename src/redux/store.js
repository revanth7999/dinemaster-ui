import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import app_menusReducer from "./menuSlice";
import backendStatusReducer from "./backendStatusSlice";

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    app_menus: app_menusReducer,
    backendStatus: backendStatusReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
