import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { promoCode } from "../../constants/promoCode";
import { Product } from "../../types";
import { getUniqueProducts } from "../../utils/getUniqueProducts";

export interface IProductsState {
  productsCart: Product[];
  defultSumProducts: number;
  sumProducts: number;
  discount: number[];
  limitOfProductsPerPage: number;
  pageOfProductsCart: number;
  searchPromo: string;
  promo: {
    [key: string]: boolean;
  };
}

const initialState: IProductsState = {
  productsCart: [],
  defultSumProducts: 0,
  sumProducts: 0,
  discount: [],
  limitOfProductsPerPage: 3,
  pageOfProductsCart: 1,
  searchPromo: "",
  promo: {
    XK3M9S: false,
    DV8Q6L: false,
  },
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
    setSumProducts: (state) => {
      state.defultSumProducts = state.productsCart.reduce(
        (acc, product) => acc + product.price,
        0
      );
      if (state.promo["XK3M9S"] === true || state.promo["DV8Q6L"] === true) {
        const discount = state.discount.reduce((acc, elem) => acc + elem);
        state.sumProducts =
          state.defultSumProducts - state.defultSumProducts * (discount / 100);
      } else {
        state.sumProducts = state.defultSumProducts;
      }
    },
    setLimitOfProductsPerPage: (
      state,
      action: PayloadAction<{ limit: number; page: number }>
    ) => {
      const statePage = Math.ceil(
        getUniqueProducts(state.productsCart).length / action.payload.limit
      );
      if (action.payload.page > statePage) {
        state.pageOfProductsCart = statePage;
      }
      state.limitOfProductsPerPage = action.payload.limit;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.pageOfProductsCart = action.payload;
    },
    setSearchPromo: (state, action: PayloadAction<string | undefined>) => {
      action.payload === undefined
        ? (state.searchPromo = "")
        : (state.searchPromo = action.payload);
    },
    applyPromocode: (state, action: PayloadAction<number>) => {
      if (state.promo[state.searchPromo] === false) {
        state.discount = [...state.discount, action.payload];
        const discount = state.discount.reduce((acc, elem) => acc + elem);
        state.sumProducts =
          state.defultSumProducts - state.defultSumProducts * (discount / 100);
      }
      state.promo[state.searchPromo] = true;
    },
    dropPromo: (state, action: PayloadAction<string>) => {
      state.promo[action.payload] = false;
      promoCode.map((elem) => {
        if (state.promo[elem.value] === false) {
          const indexRemove = state.discount.findIndex(
            (item) => item === elem.discount
          );

          state.discount = [
            ...state.discount.slice(0, indexRemove),
            ...state.discount.slice(indexRemove + 1),
          ];

          state.sumProducts = state.defultSumProducts;
        } else {
          const discount = state.discount.reduce((acc, elem) => acc + elem);
          state.sumProducts =
            state.defultSumProducts -
            state.defultSumProducts * (discount / 100);
        }
      });
    },
  },
});

export const {
  setProductsCart,
  resetProductsCart,
  setSumProducts,
  setLimitOfProductsPerPage,
  changePage,
  setSearchPromo,
  applyPromocode,
  dropPromo,
} = cartSlice.actions;

export default cartSlice.reducer;
