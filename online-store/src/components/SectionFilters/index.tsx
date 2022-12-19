import { FC } from "react";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../redux/reducers/productsReducer";
import { CaregoryFilter } from "../CaregoryFilter";

import styles from "./styles.module.scss";

export const SectionFilters: FC = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.filters}>
      <button onClick={() => dispatch(resetFilter())}>Reset Filters</button>
      <CaregoryFilter />
    </section>
  );
};
