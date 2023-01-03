import { products } from "../products";
import { brandsFilter, DualSliderFilter, Product, SortOption } from "../types";

export const sortOptions: SortOption[] = [
  {
    value: "default",
    label: "Without sorting",
  },
  {
    value: "ascCost",
    label: "Ascending Cost",
  },
  {
    value: "descCost",
    label: "Descending Cost",
  },
  {
    value: "ascStock",
    label: "Ascending Stock",
  },
  {
    value: "descStock",
    label: "Descending Stock",
  },
];

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
      .map((product: Product) => product.stock)
      .sort(
        (firstStock: number, secondStock: number) => firstStock - secondStock
      )
  )
);

export const initialStocksFilter: DualSliderFilter = {
  values: productStocks,
  inputValues: [0, productStocks.length - 1],
  minValueIndex: 0,
  maxValueIndex: productStocks.length - 1,
};
