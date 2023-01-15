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

export const StockFilter: FC = () => {
  const {
    viewProducts,
    filterStocks: { values, minValueIndex, maxValueIndex, inputValues },
    filterChangedBy,
  } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const handleChangeDualSlider = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputNumber: DualSliderInputNumbers
  ) => {
    dispatch(
      setDualSlider({
        filterType: DualSliderFilterTypes.stock,
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
    const stock = urlParams.get("stock");

    if (!stock) {
      if (FilterControllers[filterChangedBy] !== "stockController") {
        const stocks = viewProducts.map((product) => product.stock);
        defaultSettings.min =
          stocks.length > 0 ? Math.min(...stocks) : values[0];
        defaultSettings.max =
          stocks.length > 0
            ? Math.max(...stocks)
            : values[defaultSettings.maxLength];
        defaultSettings.firstInputValue =
          stocks.length > 0 ? values.indexOf(defaultSettings.min) : 0;
        defaultSettings.secondInputValue =
          stocks.length > 0
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
    <FilterContainer title="Stock">
      <DualSlider
        firstInputValue={dualSliderSettings.firstInputValue}
        secondInputValue={dualSliderSettings.secondInputValue}
        min={dualSliderSettings.min}
        max={dualSliderSettings.max}
        sliderMaxLength={dualSliderSettings.maxLength}
        handleChangeDualSlider={handleChangeDualSlider}
      />
    </FilterContainer>
  );
};
