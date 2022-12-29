import { FC } from "react";
import { DualSliderInputNumbers } from "../../../types";

import styles from "./styles.module.scss";

interface DualSlider {
  firstInputValue: number;
  secondInputValue: number;
  min: number | string;
  max: number | string;
  sliderMaxLength: number;
  handleChangeDualSlider: (
    event: React.ChangeEvent<HTMLInputElement>,
    inputNumber: number
  ) => void;
}

export const DualSlider: FC<DualSlider> = ({
  firstInputValue,
  secondInputValue,
  min,
  max,
  sliderMaxLength,
  handleChangeDualSlider,
}) => {
  return (
    <div className={styles.dualSlider}>
      <div className={styles.values}>
        <span className={styles.values__value}>{min}</span>
        <span className={styles.values__value}>⟷</span>
        <span className={styles.values__value}>{max}</span>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max={sliderMaxLength}
          value={firstInputValue}
          onChange={(event) =>
            handleChangeDualSlider(event, DualSliderInputNumbers.input1)
          }
        />
        <input
          type="range"
          min="0"
          max={sliderMaxLength}
          value={secondInputValue}
          onChange={(event) =>
            handleChangeDualSlider(event, DualSliderInputNumbers.input2)
          }
        />
      </div>
    </div>
  );
};
