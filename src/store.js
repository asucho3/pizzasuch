import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import pizzaReducer from "./features/pizza/pizzaSlice";
import userReducer from "./features/user/userSlice";
import orderReducer from "./features/order/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    pizza: pizzaReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
