import { FC } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../ProductCard";
import { RootState } from "../../../redux/store";
import { HeaderSection } from "../../UI/HeaderSection";

import styles from "./styles.module.scss";
import { StuffingHeaderSectionProducts } from "../StuffingHeaderSectionProducts";

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
      <HeaderSection>
        <StuffingHeaderSectionProducts />
      </HeaderSection>
      <div className={productStyle}>
        {viewProducts.length === 0 ? (
          <div>No products found </div>
        ) : (
          viewProducts.map((product) => (
            <ProductCard key={product.id} product={product} view={viewType} />
          ))
        )}
      </div>
    </section>
  );
};
