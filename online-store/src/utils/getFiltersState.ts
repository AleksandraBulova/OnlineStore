import { DualSliderFilter, LayoutType, Product, SortOption } from "../types";
import { getSortTypeQuery, getCaterogyQuery, getBrandQuery } from "./getFiltersQuery";

export interface FiltersState {
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
  layoutType: LayoutType;
  layoutFirstChange: boolean;
}

export const getFiltersState = (products: Product[], filters: FiltersState) => {
  let filteredProducts: Product[] = products;

  switch (filters.sortType.value) {
    case "ascCost":
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      break;
    case "descCost":
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      break;
    case "ascStock":
      filteredProducts = [...filteredProducts].sort((a, b) => a.stock - b.stock);
      break;
    case "descStock":
      filteredProducts = [...filteredProducts].sort((a, b) => b.stock - a.stock);
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

  const sortTypeQuery = getSortTypeQuery(filters.sortType);
  const searchQuery = filters.search ? `&search=${filters.search}` : "";
  const categoryQuery = getCaterogyQuery(filters.filterCategory);
  const brandsQuery = getBrandQuery(filters.filterBrand);
  const layoutType = filters.layoutType === 0 ? "vertical" : "horizontal";
  const layoutTypeQuery = filters.layoutFirstChange ? `&view=${layoutType}` : "";
  const priceMin = filters.filterPrices.values[filters.filterPrices.minValueIndex];
  const priceMax = filters.filterPrices.values[filters.filterPrices.maxValueIndex];
  const priceQuery =
    priceMin > 5 || priceMax < 7812 ? `&price=${priceMin}|${priceMax}` : "";
  const stockMin = filters.filterStocks.values[filters.filterStocks.minValueIndex];
  const stockMax = filters.filterStocks.values[filters.filterStocks.maxValueIndex];
  const stockQuery =
    stockMin > 1 || stockMax < 115 ? `&stock=${stockMin}|${stockMax}` : "";

  if (
    window.location.pathname === "/" &&
    (sortTypeQuery ||
      searchQuery ||
      categoryQuery ||
      brandsQuery ||
      priceMin > 5 ||
      priceMax < 7812 ||
      stockMin > 1 ||
      stockMax < 115 ||
      layoutType)
  ) {
    window.history.replaceState(
      null,
      "Online store",
      `/${sortTypeQuery}${searchQuery}${categoryQuery}${brandsQuery}${priceQuery}${stockQuery}${layoutTypeQuery}`.replace(
        "&",
        "?"
      )
    );
  }

  return filteredProducts;
};
