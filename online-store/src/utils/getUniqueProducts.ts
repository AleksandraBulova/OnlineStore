import { Product } from "../types";

export const getUniqueProducts = (products: Product[]) => {
  return Array.from(new Set(products.map((item: Product) => item.id))).map(
    (el) => products.find((product: Product) => product.id === el) as Product
  );
};
