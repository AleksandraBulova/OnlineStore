import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ISortOption } from "../../types";
import { products } from "../../products";

export interface IProductsState {
  products: IProduct[];
  viewProducts: IProduct[];
  sortType: ISortOption;
  search: string;
}

const initialState: IProductsState = {
  products,
  viewProducts: products,
  sortType: {
    value: "default",
    label: "Without sorting",
  },
  search: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<ISortOption>) => {
      state.sortType = action.payload;
      switch (action.payload.value) {
        case "ascCost":
          state.viewProducts = [...state.products].sort(
            (a, b) => a.price - b.price
          );
          break;
        case "descCost":
          state.viewProducts = [...state.products].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "default":
          state.viewProducts = state.products;
          break;
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      if (action.payload.length > 0) {
        state.viewProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.viewProducts = state.products;
      }
    },
  },
});

export const { setSorting, setSearch } = productsSlice.actions;

export default productsSlice.reducer;
