import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

export interface IProductsState {
  productsCart: Product[];
  limitOfProductsPerPage: number;
  pageOfProductsCart: number;
}

const initialState: IProductsState = {
  productsCart: [],
  limitOfProductsPerPage: 3,
  pageOfProductsCart: 1,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductsCart: (state, action: PayloadAction<Product>) => {
      const amountProductsCart = state.productsCart.filter(
        (product: Product) => product.id === action.payload.id
      );
      if (amountProductsCart.length < action.payload.stock) {
        state.productsCart = [...state.productsCart, action.payload];
      }
    },
    resetProductsCart: (
      state,
      action: PayloadAction<{ product: Product; buttonClick: string }>
    ) => {
      if (action.payload.buttonClick === "drop") {
        state.productsCart = state.productsCart.filter(
          (product) => product.id !== action.payload.product.id
        );
      }
      if (action.payload.buttonClick === "remove") {
        const idProducts = state.productsCart
          .reverse()
          .map((product) => product.id);

        const indexRemove = idProducts.findIndex(
          (id) => id === action.payload.product.id
        );

        state.productsCart = [
          ...state.productsCart.slice(0, indexRemove),
          ...state.productsCart.slice(indexRemove + 1),
        ].reverse();
      }
    },
    setLimitOfProductsPerPage: (
      state,
      action: PayloadAction<{ limit: number; page: number }>
    ) => {
      const statePage = Math.ceil(
        state.productsCart.length / action.payload.limit
      );
      if (action.payload.page > statePage) {
        state.pageOfProductsCart = statePage;
      }
      state.limitOfProductsPerPage = action.payload.limit;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.pageOfProductsCart = action.payload;
    },
  },
});

export const {
  setProductsCart,
  resetProductsCart,
  setLimitOfProductsPerPage,
  changePage,
} = cartSlice.actions;

export default cartSlice.reducer;
