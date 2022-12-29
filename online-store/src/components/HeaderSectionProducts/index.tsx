import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortOptions } from "../../constants/sortOptions";
import { setSearch, setSorting } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { SortOption } from "../../types";

import styles from "./styles.module.scss";

export const HeaderSectionProducts: FC = () => {
  const { sortType, search, viewProducts } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  return (
    <header className={styles.productsHeader}>
      <select
        className={styles.productsHeader__sort}
        name="sort"
        value={sortType.value}
        onChange={(event) =>
          dispatch(
            setSorting(
              sortOptions.find(
                (el) => el.value === event.target.value
              ) as SortOption
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
        className={styles.productsHeader__search}
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        type="text"
        placeholder="Search product"
      />
      <div className={styles.productsHeader__found}>
        Found: {viewProducts.length}
      </div>
    </header>
  );
};
