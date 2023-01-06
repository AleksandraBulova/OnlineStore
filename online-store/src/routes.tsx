import { Route } from "./types";
import { MainPage } from "./pages/MainPage";
import { CartPage } from "./pages/CartPage";
import { ProductPage } from "./pages/ProductPage";
import { Page404 } from "./pages/404";

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
    path: "/product/:id/:name",
    element: ProductPage,
  },
  {
    id: 4,
    name: "404",
    path: "*",
    element: Page404,
  },
];
