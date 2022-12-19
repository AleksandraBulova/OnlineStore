import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ISortOption } from "../../types";
import { products } from "../../products";

export interface IProductsState {
  products: IProduct[];
  viewProducts: IProduct[];
  sortType: ISortOption;
  search: string;
  filterCategory: {
    [key: string]: boolean;
  };
}

const initialState: IProductsState = {
  products,
  viewProducts: products,
  sortType: {
    value: "default",
    label: "Without sorting",
  },
  search: "",
  filterCategory: {
    wine: false,
    whiskey: false,
    cognac: false,
    vodka: false,
  },
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
    setFilterCategory: (
      state,
      action: PayloadAction<{ checked: boolean; category: string }>
    ) => {
      state.filterCategory[action.payload.category] = action.payload.checked;
      const choosenCategoriesKeys = Object.entries(state.filterCategory)
        .filter((el) => el[1])
        .map((el) => el[0]);
      state.viewProducts = choosenCategoriesKeys.length
        ? state.products.filter((el) => choosenCategoriesKeys.includes(el.type))
        : state.products;
    },
    resetFilter: (state) => {
      state.viewProducts = state.products;
      state.filterCategory.wine = false;
      state.filterCategory.whiskey = false;
      state.filterCategory.cognac = false;
      state.filterCategory.vodka = false;
    },
  },
});

export const { setSorting, setSearch, setFilterCategory, resetFilter } =
  productsSlice.actions;

export default productsSlice.reducer;
