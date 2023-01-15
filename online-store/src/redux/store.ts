import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducer";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
