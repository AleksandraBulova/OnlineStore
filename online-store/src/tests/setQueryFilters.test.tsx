import { setQueryFilters } from "../utils/setQueryFilters";

test("Set filters settings in query string", () => {
  const sortTypeQuery = "&sortType=ascStock";
  const searchQuery = "";
  const categoryQuery = "&categories=Vodka";
  const brandsQuery = "&brands=Nikka";
  const priceQuery = "&price=35|304";
  const stockQuery = "";
  const layoutTypeQuery = "&view=horizontal";

  setQueryFilters(
    sortTypeQuery,
    searchQuery,
    categoryQuery,
    brandsQuery,
    priceQuery,
    stockQuery,
    layoutTypeQuery
  );

  const urlParams = new URLSearchParams(window.location.search);
  const sortType = urlParams.get("sortType");
  const search = urlParams.get("search");
  const categories = urlParams.get("categories");
  const brands = urlParams.get("brands");
  const price = urlParams.get("price");
  const stock = urlParams.get("stock");
  const layoutType = urlParams.get("view");

  expect(sortType).toBe("ascStock");
  expect(search).toBeFalsy();
  expect(categories).toBe("Vodka");
  expect(brands).toBe("Nikka");
  expect(price).toBe("35|304");
  expect(stock).toBeFalsy();
  expect(layoutType).toBe("horizontal");
});
