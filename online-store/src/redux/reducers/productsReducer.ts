import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DualSliderFilter,
  DualSliderFilterTypes,
  DualSliderInputNumbers,
  Product,
  SortOption,
  LayoutType,
} from "../../types";
import { products } from "../../products";
import { getFiltersState } from "../../utils/getFiltersState";
import {
  initialPricesFilter,
  initialStocksFilter,
  sortOptions,
} from "../../constants/sortOptions";
import { getDualSliderState } from "../../utils/getDualSliderState";
import { getInitialBrandFilters } from "../../utils/getInitialBrandFilters";

export interface IProductsState {
  products: Product[];
  viewProducts: Product[];
  sortType: SortOption;
  layoutType: LayoutType;
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

const urlParams = new URLSearchParams(window.location.search);
const categories = urlParams.get("categories");
const brands = urlParams.get("brands");
const search = urlParams.get("search") || "";
const sortType = urlParams.get("sortType");

const initialState: IProductsState = {
  products: products,
  viewProducts: products,
  sortType: sortOptions.find((el) => el.value === sortType) || {
    value: "default",
    label: "Without sorting",
  },
  layoutType: LayoutType.vertical,
  search,
  filterCategory: Object.fromEntries(
    Object.entries({
      Wine: false,
      Whiskey: false,
      Cognac: false,
      Vodka: false,
    }).map((el: [string, boolean]) =>
      categories?.includes(el[0]) ? [el[0], true] : [el[0], false]
    )
  ),
  filterBrand: Object.fromEntries(
    Object.entries(getInitialBrandFilters(products)).map(
      (el: [string, boolean]) =>
        brands?.includes(el[0]) ? [el[0], true] : [el[0], false]
    )
  ),
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
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layoutType = action.payload;
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

      state[filterType].minValueIndex = Math.min(
        ...state[filterType].inputValues
      );
      state[filterType].maxValueIndex = Math.max(
        ...state[filterType].inputValues
      );

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
      state.filterBrand = getInitialBrandFilters(products);
      state.filterPrices = initialPricesFilter;
      state.filterStocks = initialStocksFilter;
      state.sortType.value = "default";
      state.sortType.label = "Without sorting";
      state.search = "";
      window.history.replaceState(null, "Online store", `/`);
    },
    updateFilters: (state) => {
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
  },
});

export const {
  setSorting,
  setLayout,
  setSearch,
  setFilterCategory,
  setDualSlider,
  resetFilter,
  setFilterBrand,
  updateFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
