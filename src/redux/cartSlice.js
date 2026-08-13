import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  restaurantId: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.userId = action.payload.userId;
      state.restaurantId = action.payload.restaurantId;
      state.items = action.payload.items;
    },

    setUserRes: (state, action) => {
      state.userId = action.payload.userId;
      state.restaurantId = action.payload.restaurantId;
    },

    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) =>
          cartItem.menuItemId === item.menuItemId,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          menuItemId: item.menuItemId,
          quantity: 1,
          price: item.price,
        });
      }
    },

    incrementItem: (state, action) => {
      const item = state.items.find(
        (item) => item.menuItemId === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrementItem: (state, action) => {
      const item = state.items.find(
        (item) => item.menuItemId === action.payload,
      );

      if (!item) return;

      item.quantity -= 1;

      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.menuItemId !== action.payload,
        );
      }
    },

    clearCart: (state) => {
      state.userId = null;
      state.restaurantId = null;
      state.items = [];
    },
  },
});

export const {
  setCart,
  addItem,
  incrementItem,
  decrementItem,
  clearCart,
  setUserRes,
} = cartSlice.actions;

export default cartSlice.reducer;
