import { FC } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../ProductCard";
import { RootState } from "../../redux/store";
import { HeaderSectionProducts } from "../HeaderSectionProducts";

import styles from "./styles.module.scss";

export const SectionProducts: FC = () => {
  const { viewProducts } = useSelector((state: RootState) => state.products);

  const viewType = "vertical";
  // const viewType = "gorizontal"

  const viewStyle = {
    vertical: styles.products__list_vertical,
    gorizontal: styles.products__list_gorizontal,
  };
  const productStyle = [styles.products__list, viewStyle[viewType]].join(" ");

  return (
    <section className={styles.products}>
      <HeaderSectionProducts />
      <div className={productStyle}>
        {viewProducts.map((product) => (
          <ProductCard key={product.id} product={product} view={viewType} />
        ))}
      </div>
    </section>
  );
};
