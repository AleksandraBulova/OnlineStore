import { FC } from "react";
import { SectionFilters } from "../../components/Main/SectionFilters";
import { SectionProducts } from "../../components/Main/SectionProducts";

import styles from "./styles.module.scss";

export const MainPage: FC = () => {
  return (
    <main className={styles.mainPage}>
      <SectionFilters />
      <SectionProducts />
    </main>
  );
};
