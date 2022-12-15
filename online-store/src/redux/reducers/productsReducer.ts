import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import { products } from "../../products";

export interface IProductsState {
  products: IProduct[];
  viewProducts: IProduct[];
}

const initialState: IProductsState = {
  products,
  viewProducts: products,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
// export const {} = productsSlice.actions;

export default productsSlice.reducer;
