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
      <label key={props.typeOrBrand} className={styles.filter}>
        <input
          className={styles.filter__input}
          type="checkbox"
          checked={props.filterCategory[props.typeOrBrand]}
          value={props.typeOrBrand}
          onChange={props.handleChangeCategory}
        />
        <span className={styles.filter__name}>{props.typeOrBrand}</span>
      </label>
    </>
  );
};
