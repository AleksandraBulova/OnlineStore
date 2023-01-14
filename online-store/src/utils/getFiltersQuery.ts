import { SortOption } from "../types";
import { getPropsToFilter } from "./getPropsToFilter";

export const getSortTypeQuery = (sortType: SortOption) => {
  return sortType.value !== "default" ? `&sortType=${sortType.value}` : "";
};

export const getCaterogyQuery = (categoryFilter: { [key: string]: boolean }) => {
  const categoriesToFilter = getPropsToFilter(categoryFilter);
  return categoriesToFilter.length ? `&categories=${categoriesToFilter.join(",")}` : "";
};

export const getBrandQuery = (brandFilter: { [key: string]: boolean }) => {
  const brandsToFilter = getPropsToFilter(brandFilter);
  return brandsToFilter.length ? `&brands=${brandsToFilter.join(",")}` : "";
};
