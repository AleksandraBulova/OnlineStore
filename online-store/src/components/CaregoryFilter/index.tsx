import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { Filter } from "../Filter";

import styles from "./styles.module.scss";

export const CaregoryFilter: FC = () => {
  const { filterCategory, products, viewProducts } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch();

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilterCategory({
        checked: event.target.checked,
        category: event.target.value,
      })
    );
  };

  const types = products.map((product) => product.type);
  const uniqueTypes = Array.from(new Set(types));

  return (
    <div className={styles.brandFilter}>
      <h2 className={styles.brandFilter__title}>Category</h2>
      {uniqueTypes.map((type) => {
        return (
          <div key={type}>
            <Filter
              key={type}
              typeOrBrand={type}
              filterCategory={filterCategory}
              handleChangeCategory={handleChangeCategory}
            />
            <div>
              ({viewProducts.filter((el) => el.type === type).length}/
              {products.filter((el) => el.type === type).length})
            </div>
          </div>
        );
      })}
    </div>
  );
};
