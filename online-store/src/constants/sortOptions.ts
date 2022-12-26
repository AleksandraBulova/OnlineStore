import { products } from "../products";
import { IProduct, ISortOption } from "../types";

type DualSliderInputValues = [firstInput: number, secondInput: number];

interface brandsFilter {
  [key: string]: boolean;
}

export interface DualSliderFilter {
  values: number[];
  inputValues: DualSliderInputValues;
  minValueIndex: number;
  maxValueIndex: number;
}

export enum DualSliderFilterTypes {
  price = "filterPrices",
  stock = "filterStocks",
}

export enum DualSliderInputNumbers {
  input1,
  input2,
}

export const sortOptions: ISortOption[] = [
  {
    value: "default",
    label: "Without sorting",
  },
  {
    value: "ascCost",
    label: "Asc Cost",
  },
  {
    value: "descCost",
    label: "Desc Cost",
  },
];

export const initialBrandsFilter: brandsFilter = {};

products.forEach((product) => (initialBrandsFilter[product.brand] = false));

const productPrices: number[] = Array.from(
  new Set(
    products
      .map((product) => product.price)
      .sort((firstPrice, secondPrice) => firstPrice - secondPrice)
  )
);

export const initialPricesFilter: DualSliderFilter = {
  values: productPrices,
  inputValues: [0, productPrices.length - 1],
  minValueIndex: 0,
  maxValueIndex: productPrices.length - 1,
};

const productStocks: number[] = Array.from(
  new Set(
    products
      .map((product: IProduct) => product.stock)
      .sort((firstStock: number, secondStock: number) => firstStock - secondStock)
  )
);

export const initialStocksFilter: DualSliderFilter = {
  values: productStocks,
  inputValues: [0, productStocks.length - 1],
  minValueIndex: 0,
  maxValueIndex: productStocks.length - 1,
};
