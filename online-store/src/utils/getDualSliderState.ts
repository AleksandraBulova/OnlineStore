import { Product, DualSliderFilter, DualSliderFilterTypes } from "../types";

export const getDualSliderState = (
  viewProducts: Product[],
  dualSliderState: DualSliderFilter,
  sliderType: DualSliderFilterTypes
) => {
  const valueType = getKeyByValue(sliderType);
  const values: number[] = viewProducts.map(
    (product) => product[valueType as keyof Product] as number
  );
  const minValue: number = Math.min(...values);
  const maxValue: number = Math.max(...values);
  const minIndex = dualSliderState.values.indexOf(minValue);
  const maxIndex = dualSliderState.values.indexOf(maxValue);

  dualSliderState.inputValues = [minIndex, maxIndex];
  dualSliderState.minValueIndex = minIndex;
  dualSliderState.maxValueIndex = maxIndex;

  return dualSliderState;
};

function getKeyByValue(value: DualSliderFilterTypes) {
  const keyIndex = Object.values(DualSliderFilterTypes).indexOf(value);
  const key = Object.keys(DualSliderFilterTypes)[keyIndex];

  return key;
}
