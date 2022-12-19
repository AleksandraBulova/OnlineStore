import { FC } from "react";
import { SectionFilters } from "../../components/SectionFilters";
import { SectionProducts } from "../../components/SectionProducts";

export const MainPage: FC = () => {
  return (
    <main>
      <h2>Main page</h2>
      <SectionFilters />
      <SectionProducts />
    </main>
  );
};
