import { getSortTypeQuery } from "../utils/getFiltersQuery";
import { sortOptions } from "../constants/sortOptions";

test("Get sort type query", () => {
  expect(getSortTypeQuery(sortOptions[0])).toBe("");
  expect(getSortTypeQuery(sortOptions[1])).toBe("&sortType=ascCost");
  expect(getSortTypeQuery(sortOptions[2])).toBe("&sortType=descCost");
  expect(getSortTypeQuery(sortOptions[3])).toBe("&sortType=ascStock");
  expect(getSortTypeQuery(sortOptions[4])).toBe("&sortType=descStock");
  expect(getSortTypeQuery(sortOptions[4])).not.toBe("");
});
