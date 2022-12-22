import { FC } from "react";

import styles from "./styles.module.scss";

interface FilterProps {
  typeOrBrand: string;
  filterCategory: {
    [key: string]: boolean;
  };
  handleChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filter: FC<FilterProps> = (props) => {
  return (
    <>
      <label key={props.typeOrBrand} className={styles.brandFilter__checkbox}>
        <input
          className={styles.brandFilter__checkbox__input}
          type="checkbox"
          checked={props.filterCategory[props.typeOrBrand]}
          value={props.typeOrBrand}
          onChange={props.handleChangeCategory}
        />
        {props.typeOrBrand}
      </label>
    </>
  );
};
