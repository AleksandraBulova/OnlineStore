import { FC } from "react";
import { SectionFilters } from "../../components/SectionFilters";
import { SectionProducts } from "../../components/SectionProducts";

import styles from "./styles.module.scss";

export const MainPage: FC = () => {
  return (
    <main className={styles.mainPage}>
      <SectionFilters />
      <SectionProducts />
    </main>
  );
};
