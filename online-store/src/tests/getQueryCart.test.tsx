import { getQueryCart } from "../utils/getQueryCart";

test("Get correct query string for cart", () => {
  getQueryCart(2, 4);
  const urlParams = new URLSearchParams(window.location.search);
  const limit = urlParams.get("limit");
  const page = urlParams.get("page");
  expect(limit).toBe("2");
  expect(page).toBe("4");
});
