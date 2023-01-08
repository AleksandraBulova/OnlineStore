import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDualSlider } from "../../../../redux/reducers/productsReducer";
import { RootState } from "../../../../redux/store";
import {
  DualSliderFilterTypes,
  DualSliderInputNumbers,
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

  const dualSliderSettings = useMemo(() => {
    const defaultSettings = {
      maxLength: values.length - 1,
      firstInputValue: inputValues[0],
      secondInputValue: inputValues[1],
      min: values[minValueIndex],
      max: values[maxValueIndex],
    };

    const urlParams = new URLSearchParams(window.location.search);
    const price = urlParams.get("price");
    if (!price) {
      if (FilterControllers[filterChangedBy] !== "priceController") {
        const prices = viewProducts.map((product) => product.price);
        defaultSettings.min =
          prices.length > 0 ? Math.min(...prices) : values[0];
        defaultSettings.max =
          prices.length > 0
            ? Math.max(...prices)
            : values[defaultSettings.maxLength];
        defaultSettings.firstInputValue =
          prices.length > 0 ? values.indexOf(defaultSettings.min) : 0;
        defaultSettings.secondInputValue =
          prices.length > 0
            ? values.indexOf(defaultSettings.max)
            : defaultSettings.maxLength;
      }
    }

    return defaultSettings;
  }, [
    values,
    inputValues,
    minValueIndex,
    maxValueIndex,
    viewProducts,
    filterChangedBy,
  ]);

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
