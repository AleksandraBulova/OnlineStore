import { DualSliderFilter, DualSliderFilterTypes, Product, SortOption } from "../types";

export interface IFiltersState {
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

export const getFiltersState = (products: Product[], filters: IFiltersState) => {
  let filteredProducts: Product[] = products;

  switch (filters.sortType.value) {
    case "ascCost":
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      break;
    case "descCost":
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      break;
    case "default":
      filteredProducts = products;
      break;
  }

  if (filters.search.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        String(product.price).includes(filters.search) ||
        String(product.stock).includes(filters.search)
    );
  }

  const choosenCategoriesKeys = Object.entries(filters.filterCategory)
    .filter((el) => el[1])
    .map((el) => el[0]);
  filteredProducts = choosenCategoriesKeys.length
    ? filteredProducts.filter((el) => choosenCategoriesKeys.includes(el.type))
    : filteredProducts;

  const choosenBrandKeys = Object.entries(filters.filterBrand)
    .filter((el) => el[1])
    .map((el) => el[0]);
  filteredProducts = choosenBrandKeys.length
    ? filteredProducts.filter((el) => choosenBrandKeys.includes(el.brand))
    : filteredProducts;

  filteredProducts = filteredProducts.filter((product) => {
    const priceValues = filters.filterPrices.values;
    const minPriceIndex = filters.filterPrices.minValueIndex;
    const maxPriceIndex = filters.filterPrices.maxValueIndex;

    return (
      product.price >= priceValues[minPriceIndex] &&
      product.price <= priceValues[maxPriceIndex]
    );
  });

  filteredProducts = filteredProducts.filter((product) => {
    const stockValues = filters.filterStocks.values;
    const minStockIndex = filters.filterStocks.minValueIndex;
    const maxStockIndex = filters.filterStocks.maxValueIndex;

    return (
      product.stock >= stockValues[minStockIndex] &&
      product.stock <= stockValues[maxStockIndex]
    );
  });

  return filteredProducts;
};
