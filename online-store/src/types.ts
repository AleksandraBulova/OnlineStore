import { FC } from "react";

export interface IRoute {
  id: number;
  name: string;
  path: string;
  element: FC;
}

export interface IProduct {
  id: number;
  type: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  photo: Array<string>;
}

export interface ISortOption {
  value: string;
  label: string;
}
