import { getPriceQuery } from "../utils/getFiltersQuery";
import { initialPricesFilter } from "../constants/sortOptions";

test("Get price filter query string", () => {
  expect(
    getPriceQuery(initialPricesFilter.values, 0, initialPricesFilter.values.length - 1)
  ).toBe("");
  expect(getPriceQuery(initialPricesFilter.values, 5, 26)).toBe("&price=17|65");
});
