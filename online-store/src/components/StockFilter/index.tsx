import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDualSlider } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { FilterContainer } from "../FilterConteiner";
import { DualSlider } from "../UI/DualSlider";
import {
  DualSliderFilterTypes,
  DualSliderInputNumbers,
} from "../../constants/sortOptions";

export const StockFilter: FC = () => {
  const {
    filterStocks: { values, inputValues, minValueIndex, maxValueIndex },
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
  const minStock = values[minValueIndex];
  const maxStock = values[maxValueIndex];
  const maxLength = values.length - 1;

  return (
    <FilterContainer title="Stock">
      <DualSlider
        firstInputValue={inputValues[0]}
        secondInputValue={inputValues[1]}
        min={minStock}
        max={maxStock}
        sliderMaxLength={maxLength}
        handleChangeDualSlider={handleChangeDualSlider}
      />
    </FilterContainer>
  );
};
