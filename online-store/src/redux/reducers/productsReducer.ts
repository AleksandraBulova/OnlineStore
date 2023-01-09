import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DualSliderFilter,
  DualSliderFilterTypes,
  DualSliderInputNumbers,
  Product,
  SortOption,
  LayoutType,
  FilterControllers,
} from "../../types";
import { products } from "../../products";
import { getFiltersState } from "../../utils/getFiltersState";
import {
  initialPricesFilter,
  initialStocksFilter,
  sortOptions,
} from "../../constants/sortOptions";
import { getInitialBrandFilters } from "../../utils/getInitialBrandFilters";

export interface IProductsState {
  products: Product[];
  viewProducts: Product[];
  sortType: SortOption;
  layoutType: number;
  layoutFirstChange: boolean;
  search: string;
  filterCategory: {
    [key: string]: boolean;
  };
  filterBrand: {
    [key: string]: boolean;
  };
  filterPrices: DualSliderFilter;
  filterStocks: DualSliderFilter;
  filterChangedBy: FilterControllers;
  activeImg: number;
}

const urlParams = new URLSearchParams(window.location.search);
const categories = urlParams.get("categories");
const brands = urlParams.get("brands");
const search = urlParams.get("search") || "";
const sortType = urlParams.get("sortType");
const view = urlParams.get("view");
const price = urlParams.get("price");
const minIndexPrice = initialPricesFilter.values.indexOf(
  Number(price?.split("|")[0])
);
const maxIndexPrice = initialPricesFilter.values.indexOf(
  Number(price?.split("|")[1])
);
const initialPricesFilterQuery: DualSliderFilter = {
  values: initialPricesFilter.values,
  inputValues: [minIndexPrice, maxIndexPrice],
  minValueIndex: minIndexPrice,
  maxValueIndex: maxIndexPrice,
};
const stock = urlParams.get("stock");
const minIndexStock = initialStocksFilter.values.indexOf(
  Number(stock?.split("|")[0])
);
const maxIndexStock = initialStocksFilter.values.indexOf(
  Number(stock?.split("|")[1])
);
const initialStockFilterQuery: DualSliderFilter = {
  values: initialStocksFilter.values,
  inputValues: [minIndexStock, maxIndexStock],
  minValueIndex: minIndexStock,
  maxValueIndex: maxIndexStock,
};

const initialState: IProductsState = {
  products: products,
  viewProducts: products,
  sortType: sortOptions.find((el) => el.value === sortType) || {
    value: "default",
    label: "Without sorting",
  },
  layoutType: view === "horizontal" ? 1 : 0,
  layoutFirstChange: view ? true : false,
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
  filterPrices: price ? initialPricesFilterQuery : initialPricesFilter,
  filterStocks: stock ? initialStockFilterQuery : initialStocksFilter,
  filterChangedBy: FilterControllers.initial,
  activeImg: 0,
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
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filterChangedBy = FilterControllers.searchController;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
      state.viewProducts = viewProducts;
    },
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layoutType = action.payload;
      state.layoutFirstChange = true;
      const actualState = JSON.parse(JSON.stringify(state));
      getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
    },
    setFilterCategory: (
      state,
      action: PayloadAction<{ checked: boolean; category: string }>
    ) => {
      state.filterCategory[action.payload.category] = action.payload.checked;
      state.filterChangedBy = FilterControllers.categoryController;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
      state.viewProducts = viewProducts;
    },
    setFilterBrand: (
      state,
      action: PayloadAction<{ checked: boolean; brand: string }>
    ) => {
      state.filterBrand[action.payload.brand] = action.payload.checked;
      state.filterChangedBy = FilterControllers.brandController;

      const actualState = JSON.parse(JSON.stringify(state));
      const viewProducts = getFiltersState(actualState.products, {
        sortType: actualState.sortType,
        search: actualState.search,
        filterCategory: actualState.filterCategory,
        filterBrand: actualState.filterBrand,
        filterPrices: actualState.filterPrices,
        filterStocks: actualState.filterStocks,
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
      state.viewProducts = viewProducts;
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

      if (filterType === "filterPrices") {
        state.filterChangedBy = FilterControllers.priceController;
      }

      if (filterType === "filterStocks") {
        state.filterChangedBy = FilterControllers.stockController;
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
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
      state.viewProducts = viewProducts;
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
      state.layoutType = 0;
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
        layoutType: actualState.layoutType,
        layoutFirstChange: actualState.layoutFirstChange,
      });
    },
    setImg: (state, action: PayloadAction<number>) => {
      state.activeImg = action.payload;
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
  setImg,
} = productsSlice.actions;

export default productsSlice.reducer;
