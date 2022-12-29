import { Route } from "./types";
import { MainPage } from "./pages/MainPage";
import { CartPage } from "./pages/CartPage";
import { ProductPage } from "./pages/ProductPage";

export const routes: Route[] = [
  {
    id: 1,
    name: "Main",
    path: "/",
    element: MainPage,
  },
  {
    id: 2,
    name: "Cart",
    path: "/cart",
    element: CartPage,
  },
  {
    id: 3,
    name: "Product",
    path: "/product/:id",
    element: ProductPage,
  },
];
