import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.cart.push(action.payload);
      state.totalPrice = state.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    increase(state, action) {
      state.cart = state.cart.map((item) =>
        item.name === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.price / item.quantity,
            }
          : item,
      );
      state.totalPrice = state.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    decrease(state, action) {
      state.cart = state.cart.map((item) =>
        item.name === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.price / item.quantity,
            }
          : item,
      );
      state.totalPrice = state.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    remove(state, action) {
      state.cart = state.cart.filter((item) => item.name !== action.payload);
      state.totalPrice = state.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    clearCart(state, action) {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const { add, increase, decrease, remove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
