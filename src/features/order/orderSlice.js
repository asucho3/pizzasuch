import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: "",
  products: "",
  ingredients: "",
  quantities: "",
  prices: "",
  totalPrice: 0,
  orderId: "",
  fullName: "",
  address: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.customer = action.payload.customer;
      state.products = action.payload.products;
      state.ingredients = action.payload.ingredients;
      state.quantities = action.payload.quantities;
      state.prices = action.payload.prices;
      state.totalPrice = action.payload.totalPrice;
      state.orderId = action.payload.orderId;
      state.fullName = action.payload.fullName;
      state.address = action.payload.address;
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
