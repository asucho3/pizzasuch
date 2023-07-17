import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload,
      );
    },
    clearIngredients(state, action) {
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearIngredients } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
