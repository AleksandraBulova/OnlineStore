import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ISortOption } from "../../types";
import { products, randomProducts } from "../../products";
import { initialBrandsFilter } from "../../constants/sortOptions";

export interface IProductsState {
  products: IProduct[];
  viewProducts: IProduct[];
  sortType: ISortOption;
  search: string;
  filterCategory: {
    [key: string]: boolean;
  };
  filterBrand: {
    [key: string]: boolean;
  };
  productsCart: IProduct[];
}

const initialState: IProductsState = {
  products,
  viewProducts: randomProducts,
  sortType: {
    value: "default",
    label: "Without sorting",
  },
  search: "",
  filterCategory: {
    Wine: false,
    Whiskey: false,
    Cognac: false,
    Vodka: false,
  },
  filterBrand: initialBrandsFilter,
  productsCart: [],
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
          state.viewProducts = randomProducts;
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
        state.viewProducts = randomProducts;
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
        : randomProducts;
    },
    setFilterBrand: (
      state,
      action: PayloadAction<{ checked: boolean; brand: string }>
    ) => {
      state.filterBrand[action.payload.brand] = action.payload.checked;
      const choosenCategoriesKeys = Object.entries(state.filterBrand)
        .filter((el) => el[1])
        .map((el) => el[0]);
      state.viewProducts = choosenCategoriesKeys.length
        ? state.products.filter((el) =>
            choosenCategoriesKeys.includes(el.brand)
          )
        : randomProducts;
    },
    resetFilter: (state) => {
      state.viewProducts = randomProducts;
      state.filterCategory.Wine = false;
      state.filterCategory.Whiskey = false;
      state.filterCategory.Cognac = false;
      state.filterCategory.Vodka = false;
      state.filterBrand = initialBrandsFilter;
      state.sortType.value = "default";
      state.sortType.label = "Without sorting";
      state.search = "";
    },
    setProductsCart: (state, action: PayloadAction<IProduct>) => {
      state.productsCart = [...state.productsCart, action.payload];
      console.log(state.productsCart);
    },
    resetProductsCart: (state, action: PayloadAction<IProduct>) => {
      state.productsCart = state.productsCart.filter(
        (product) => product.id !== action.payload.id
      );
      console.log(state.productsCart);
    },
  },
});

export const {
  setSorting,
  setSearch,
  setFilterCategory,
  resetFilter,
  setFilterBrand,
  setProductsCart,
  resetProductsCart,
} = productsSlice.actions;

export default productsSlice.reducer;
