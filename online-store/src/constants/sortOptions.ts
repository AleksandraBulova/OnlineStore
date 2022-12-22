import { products } from "../products";
import { ISortOption } from "../types";

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

interface brandsFilter {
  [key: string]: boolean;
}

export const initialBrandsFilter: brandsFilter = {};

products.forEach((product) => (initialBrandsFilter[product.brand] = false));
