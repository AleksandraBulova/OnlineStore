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

export enum LayoutType {
  vertical,
  horizontal,
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

export type DualSliderInputValues = [firstInput: number, secondInput: number];

export interface DualSliderFilter {
  values: number[];
  inputValues: DualSliderInputValues;
  minValueIndex: number;
  maxValueIndex: number;
}

export type DualSliderSettings = {
  maxLength: number;
  firstInputValue: number;
  secondInputValue: number;
  min: number;
  max: number;
};

export interface PromoCode {
  value: string;
  discount: number;
}

export enum FilterControllers {
  initial,
  searchController,
  categoryController,
  brandController,
  priceController,
  stockController,
}

export enum ModalInputsTypes {
  name,
  tel,
  address,
  email,
  cardNum,
  cardThru,
  CVV,
}
