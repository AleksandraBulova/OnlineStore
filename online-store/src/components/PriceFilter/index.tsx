import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDualSlider } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { DualSliderFilterTypes, DualSliderInputNumbers } from "../../types";
import { FilterContainer } from "../FilterConteiner";
import { DualSlider } from "../UI/DualSlider";

import styles from "./styles.module.scss";

export const PriceFilter: FC = () => {
  const {
    filterPrices: { values, inputValues, minValueIndex, maxValueIndex },
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
  const minPrice = values[minValueIndex];
  const maxPrice = values[maxValueIndex];
  const maxLength = values.length - 1;

  return (
    <FilterContainer title="Prices">
      <DualSlider
        firstInputValue={inputValues[0]}
        secondInputValue={inputValues[1]}
        min={minPrice + "$"}
        max={maxPrice + "$"}
        sliderMaxLength={maxLength}
        handleChangeDualSlider={handleChangeDualSlider}
      />
    </FilterContainer>
  );
};
