import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DualSliderFilter,
  DualSliderFilterTypes,
  DualSliderInputNumbers,
  Product,
  SortOption,
} from "../../types";
import { randomProducts } from "../../products";
import { getFiltersState } from "../../utils/getFiltersState";
import {
  initialBrandsFilter,
  initialPricesFilter,
  initialStocksFilter,
} from "../../constants/sortOptions";
import { getDualSliderState } from "../../utils/getDualSliderState";

export interface IProductsState {
  products: Product[];
  viewProducts: Product[];
  sortType: SortOption;
  search: string;
  filterCategory: {
    [key: string]: boolean;
  };
  filterBrand: {
    [key: string]: boolean;
  };
  filterPrices: DualSliderFilter;
  filterStocks: DualSliderFilter;
}

const initialState: IProductsState = {
  products: randomProducts,
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
  filterPrices: initialPricesFilter,
  filterStocks: initialStocksFilter,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortOption>) => {
      state.sortType = action.payload;
      const actualState = JSON.parse(JSON.stringify(state));
      state.viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
      });
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filterPrices = initialPricesFilter;
      state.filterStocks = initialStocksFilter;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
      });
      state.viewProducts = viewProducts;

      if (viewProducts.length > 0) {
        const priceInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.price],
          DualSliderFilterTypes.price
        );

        const stockInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.stock],
          DualSliderFilterTypes.stock
        );

        state.filterPrices = priceInputValues;
        state.filterStocks = stockInputValues;
      }
    },
    setFilterCategory: (
      state,
      action: PayloadAction<{ checked: boolean; category: string }>
    ) => {
      state.filterCategory[action.payload.category] = action.payload.checked;
      state.filterPrices = initialPricesFilter;
      state.filterStocks = initialStocksFilter;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
      });
      state.viewProducts = viewProducts;

      if (viewProducts.length > 0) {
        const priceInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.price],
          DualSliderFilterTypes.price
        );

        const stockInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.stock],
          DualSliderFilterTypes.stock
        );

        state.filterPrices = priceInputValues;
        state.filterStocks = stockInputValues;
      }
    },
    setFilterBrand: (
      state,
      action: PayloadAction<{ checked: boolean; brand: string }>
    ) => {
      state.filterBrand[action.payload.brand] = action.payload.checked;
      state.filterPrices = initialPricesFilter;
      state.filterStocks = initialStocksFilter;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
      });
      state.viewProducts = viewProducts;

      if (viewProducts.length > 0) {
        const priceInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.price],
          DualSliderFilterTypes.price
        );

        const stockInputValues = getDualSliderState(
          viewProducts,
          actualState[DualSliderFilterTypes.stock],
          DualSliderFilterTypes.stock
        );

        state.filterPrices = priceInputValues;
        state.filterStocks = stockInputValues;
      }
    },
    setDualSlider: (
      state,
      action: PayloadAction<{
        filterType: DualSliderFilterTypes;
        value: string;
        inputNumber: DualSliderInputNumbers;
      }>
    ) => {
      const filterType = action.payload.filterType;
      const value = Number(action.payload.value);
      const inputNumber = action.payload.inputNumber;

      if (filterType === "filterStocks") {
        state.filterPrices = initialPricesFilter;
      }
      if (filterType === "filterPrices") {
        state.filterStocks = initialStocksFilter;
      }

      if (inputNumber === 0) {
        state[filterType].inputValues[0] = value;
      }

      if (inputNumber === 1) {
        state[filterType].inputValues[1] = value;
      }

      state[filterType].minValueIndex = Math.min(...state[filterType].inputValues);
      state[filterType].maxValueIndex = Math.max(...state[filterType].inputValues);

      const actualState = JSON.parse(JSON.stringify(state));
      console.log(filterType);
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
      });
      state.viewProducts = viewProducts;

      if (viewProducts.length > 0) {
        if (filterType === "filterStocks") {
          const priceInputValues = getDualSliderState(
            viewProducts,
            actualState[DualSliderFilterTypes.price],
            DualSliderFilterTypes.price
          );
          state.filterPrices = priceInputValues;
        }

        if (filterType === "filterPrices") {
          const stockInputValues = getDualSliderState(
            viewProducts,
            actualState[DualSliderFilterTypes.stock],
            DualSliderFilterTypes.stock
          );

          state.filterStocks = stockInputValues;
        }
      }
    },
    resetFilter: (state) => {
      state.viewProducts = state.products;
      state.filterCategory.Wine = false;
      state.filterCategory.Whiskey = false;
      state.filterCategory.Cognac = false;
      state.filterCategory.Vodka = false;
      state.filterBrand = initialBrandsFilter;
      state.filterPrices = initialPricesFilter;
      state.filterStocks = initialStocksFilter;
      state.sortType.value = "default";
      state.sortType.label = "Without sorting";
      state.search = "";
    },
  },
});

export const {
  setSorting,
  setSearch,
  setFilterCategory,
  setDualSlider,
  resetFilter,
  setFilterBrand,
} = productsSlice.actions;

export default productsSlice.reducer;
