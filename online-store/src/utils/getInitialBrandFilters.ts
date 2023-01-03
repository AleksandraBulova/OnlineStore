import { brandsFilter, Product } from "../types";

export const getInitialBrandFilters = (products: Product[]) => {
  const initialBrandsFilter: brandsFilter = {};
  products.forEach((product) => (initialBrandsFilter[product.brand] = false));

  return initialBrandsFilter;
};
