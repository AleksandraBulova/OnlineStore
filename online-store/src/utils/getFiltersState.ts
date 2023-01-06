import { DualSliderFilter, Product, SortOption } from "../types";

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

export const getFiltersState = (
  products: Product[],
  filters: IFiltersState
) => {
  let filteredProducts: Product[] = products;

  switch (filters.sortType.value) {
    case "ascCost":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
      break;
    case "descCost":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
      break;
    case "ascStock":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.stock - b.stock
      );
      break;
    case "descStock":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.stock - a.stock
      );
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
        product.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
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

  const sortType =
    filters.sortType.value !== "default" ? filters.sortType.value : "";
  const sortTypeQuery = sortType && `&sortType=${sortType}`;
  const search = filters.search;
  const searchQuery = search && `&search=${search}`;
  const category = Object.entries(filters.filterCategory).reduce(
    (acc: string[], curr) => (curr[1] ? [...acc, curr[0]] : [...acc]),
    []
  );
  const categoryQuery = category.length
    ? `&categories=${category.join(",")}`
    : "";
  const brands = Object.entries(filters.filterBrand).reduce(
    (acc: string[], curr) => (curr[1] ? [...acc, curr[0]] : [...acc]),
    []
  );
  const brandsQuery = brands.length ? `&brands=${brands.join(",")}` : "";
  const priceMin =
    filters.filterPrices.values[filters.filterPrices.minValueIndex];
  const priceMax =
    filters.filterPrices.values[filters.filterPrices.maxValueIndex];
  const priceQuery = (priceMin || priceMax) && `&price=${priceMin}|${priceMax}`;

  // filterPrices: actualState.filterPrices,
  // filterStocks: actualState.filterStocks,

  if (sortType || search || category.length || brands.length) {
    window.history.replaceState(
      null,
      "Online store",
      `/${sortTypeQuery}${searchQuery}${categoryQuery}${brandsQuery}${priceQuery}`.replace(
        "&",
        "?"
      )
    );
  }

  return filteredProducts;
};
