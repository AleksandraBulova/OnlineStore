import { SortOption } from "../types";
import { getPropsToFilter } from "./getPropsToFilter";

export const getSortTypeQuery = (sortType: SortOption) => {
  return sortType.value !== "default" ? `&sortType=${sortType.value}` : "";
};

export const getSearchQuery = (search: string) => {
  return search ? `&search=${search}` : "";
};

export const getCaterogyQuery = (categoryFilter: { [key: string]: boolean }) => {
  const categoriesToFilter = getPropsToFilter(categoryFilter);
  return categoriesToFilter.length ? `&categories=${categoriesToFilter.join(",")}` : "";
};

export const getBrandQuery = (brandFilter: { [key: string]: boolean }) => {
  const brandsToFilter = getPropsToFilter(brandFilter);
  return brandsToFilter.length ? `&brands=${brandsToFilter.join(",")}` : "";
};

export const getlayoutTypeQuery = (layoutType: number, firstChange: boolean) => {
  const layout = layoutType === 0 ? "vertical" : "horizontal";

  return firstChange ? `&view=${layout}` : "";
};

export const getPriceQuery = (
  prices: number[],
  minPriceIndex: number,
  maxPriceIndex: number
) => {
  const minPrice = prices[minPriceIndex];
  const maxPrice = prices[maxPriceIndex];

  return minPrice > prices[0] || maxPrice < prices[prices.length - 1]
    ? `&price=${minPrice}|${maxPrice}`
    : "";
};

export const getStockQuery = (
  stocks: number[],
  minStockIndex: number,
  maxStockIndex: number
) => {
  const minStock = stocks[minStockIndex];
  const maxStock = stocks[maxStockIndex];

  return minStock > stocks[0] || maxStock < stocks[stocks.length - 1]
    ? `&stock=${minStock}|${maxStock}`
    : "";
};
