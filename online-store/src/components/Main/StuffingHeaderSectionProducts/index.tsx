import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortOptions } from "../../../constants/sortOptions";
import {
  setSearch,
  setSorting,
  setLayout,
} from "../../../redux/reducers/productsReducer";
import { RootState } from "../../../redux/store";
import { SortOption, LayoutType } from "../../../types";

import styles from "./styles.module.scss";

export const StuffingHeaderSectionProducts: FC = () => {
  const { sortType, layoutType, search, viewProducts } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const verticalSelectorStyles = [styles.selector];
  const horizontalSelectorStyles = [styles.selector, styles.selector_horizontal];
  if (LayoutType[layoutType] === "vertical")
    verticalSelectorStyles.push(styles.selector_active);
  if (LayoutType[layoutType] === "horizontal")
    horizontalSelectorStyles.push(styles.selector_active);

  return (
    <>
      <select
        className={styles.sort}
        name="sort"
        value={sortType.value}
        onChange={(event) =>
          dispatch(
            setSorting(
              sortOptions.find((el) => el.value === event.target.value) as SortOption
            )
          )
        }
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        className={styles.search}
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        type="text"
        placeholder="Search product"
      />
      <div className={styles.found}>Found: {viewProducts.length}</div>
      <div className={styles.gridSelectors}>
        <div
          className={verticalSelectorStyles.join(" ")}
          onClick={() => dispatch(setLayout(LayoutType.vertical))}
        >
          <div className={styles.selector__item}></div>
          <div className={styles.selector__item}></div>
          <div className={styles.selector__item}></div>
        </div>
        <div
          className={horizontalSelectorStyles.join(" ")}
          onClick={() => dispatch(setLayout(LayoutType.horizontal))}
        >
          <div className={styles.selector__item}></div>
          <div className={styles.selector__item}></div>
          <div className={styles.selector__item}></div>
        </div>
      </div>
    </>
  );
};
