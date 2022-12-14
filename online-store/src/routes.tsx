import { IRoute } from "./types";
import { MainPage } from "./pages/MainPage";
import { CartPage } from "./pages/CartPage";

export const routes: IRoute[] = [
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
];
