import { FC } from "react";

export interface Route {
  id: number;
  name: string;
  path: string;
  element: FC;
}

export interface Product {
  id: number;
  type: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  photo: Array<string>;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface brandsFilter {
  [key: string]: boolean;
}

export enum DualSliderFilterTypes {
  price = "filterPrices",
  stock = "filterStocks",
}

export enum DualSliderInputNumbers {
  input1,
  input2,
}

type DualSliderInputValues = [firstInput: number, secondInput: number];

export interface DualSliderFilter {
  values: number[];
  inputValues: DualSliderInputValues;
  minValueIndex: number;
  maxValueIndex: number;
}
