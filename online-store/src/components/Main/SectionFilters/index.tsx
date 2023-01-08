import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../../redux/reducers/productsReducer";
import { BrandFilter } from "../Filters/BrandFilter";
import { CaregoryFilter } from "../Filters/CategoryFilter";
import { PriceFilter } from "../Filters/PriceFilter";
import { StockFilter } from "../Filters/StockFilter";
import { Button } from "../../UI/Button";

import styles from "./styles.module.scss";

export const SectionFilters: FC = () => {
  const dispatch = useDispatch();
  const [copy, setCopy] = useState(false);
  const copyLink = () => {
    setCopy((copy) => (copy = true));
    if (navigator?.clipboard?.writeText) {
      navigator?.clipboard?.writeText(window.location.href);
    } else {
      alert("Copy doesn't work on http!");
    }
    setTimeout(() => setCopy((copy) => (copy = false)), 800);
  };
  const resetFilters = () => dispatch(resetFilter());

  return (
    <section className={styles.filters}>
      <div className={styles.filters__buttons}>
        <Button
          text={copy ? "Copied!" : "Copy link"}
          isActive={false}
          onClick={copyLink}
        />
        <Button text="Reset" isActive={false} onClick={resetFilters} />
      </div>
      <CaregoryFilter />
      <BrandFilter />
      <PriceFilter />
      <StockFilter />
    </section>
  );
};
