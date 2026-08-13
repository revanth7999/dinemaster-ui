import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import app_menusReducer from "./menuSlice";
import backendStatusReducer from "./backendStatusSlice";
import cartReducer from "./cartSlice";

import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

/*
 * Auth persistence
 */
const authPersistConfig = {
  key: "auth",
  storage,
};

/*
 * Cart persistence
 */
const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer,
);

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    app_menus: app_menusReducer,
    backendStatus: backendStatusReducer,
    cart: persistedCartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
