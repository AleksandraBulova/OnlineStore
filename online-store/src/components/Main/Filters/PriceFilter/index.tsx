import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDualSlider } from "../../../../redux/reducers/productsReducer";
import { RootState } from "../../../../redux/store";
import {
  DualSliderFilterTypes,
  DualSliderInputNumbers,
  DualSliderSettings,
  FilterControllers,
} from "../../../../types";
import { FilterContainer } from "../FilterConteiner";
import { DualSlider } from "../../../UI/DualSlider";

export const PriceFilter: FC = () => {
  const {
    viewProducts,
    filterPrices: { values, minValueIndex, maxValueIndex, inputValues },
    filterChangedBy,
  } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const handleChangeDualSlider = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputNumber: DualSliderInputNumbers
  ) => {
    dispatch(
      setDualSlider({
        filterType: DualSliderFilterTypes.price,
        value: event.target.value,
        inputNumber,
      })
    );
  };

  const dualSliderSettings: DualSliderSettings = {
    maxLength: values.length - 1,
    firstInputValue: inputValues[0],
    secondInputValue: inputValues[1],
    min: values[minValueIndex],
    max: values[maxValueIndex],
  };

  if (FilterControllers[filterChangedBy] !== "priceController") {
    const prices = viewProducts.map((product) => product.price);
    dualSliderSettings.min = prices.length > 0 ? Math.min(...prices) : values[0];
    dualSliderSettings.max =
      prices.length > 0 ? Math.max(...prices) : values[dualSliderSettings.maxLength];
    dualSliderSettings.firstInputValue =
      prices.length > 0 ? values.indexOf(dualSliderSettings.min) : 0;
    dualSliderSettings.secondInputValue =
      prices.length > 0
        ? values.indexOf(dualSliderSettings.max)
        : dualSliderSettings.maxLength;
  }

  return (
    <FilterContainer title="Prices">
      <DualSlider
        firstInputValue={dualSliderSettings.firstInputValue}
        secondInputValue={dualSliderSettings.secondInputValue}
        min={dualSliderSettings.min + "$"}
        max={dualSliderSettings.max + "$"}
        sliderMaxLength={dualSliderSettings.maxLength}
        handleChangeDualSlider={handleChangeDualSlider}
      />
    </FilterContainer>
  );
};
