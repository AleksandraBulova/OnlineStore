import { getStockQuery } from "../utils/getFiltersQuery";
import { initialStocksFilter } from "../constants/sortOptions";

test("Get price filter query string", () => {
  expect(
    getStockQuery(initialStocksFilter.values, 0, initialStocksFilter.values.length - 1)
  ).toBe("");
  expect(getStockQuery(initialStocksFilter.values, 10, 45)).toBe("&stock=15|93");
});
