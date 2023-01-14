import { getUniqueProducts } from "../utils/getUniqueProducts";
import { products } from "../products";

const productsToTest = [products[0], products[1], products[1], products[2], products[0]];
const uniqueProducts = [products[0], products[1], products[2]];

test("Get unique products", () => {
  expect(getUniqueProducts(productsToTest)).toEqual(uniqueProducts);
});
