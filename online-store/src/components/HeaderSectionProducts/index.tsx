import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortOptions } from "../../constants/sortOptions";
import { products } from "../../products";
import { setSearch, setSorting } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { ISortOption } from "../../types";

export const HeaderSectionProducts: FC = () => {
  const { sortType, search } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  return (
    <header>
      <select
        name="sort"
        value={sortType.value}
        onChange={(event) =>
          dispatch(
            setSorting(
              sortOptions.find(
                (el) => el.value === event.target.value
              ) as ISortOption
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
      <div>Found: {products.length}</div>
      <input
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        type="text"
        placeholder="Search product"
      />
    </header>
  );
};
