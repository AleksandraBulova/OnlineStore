import { FC } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../ProductCard";
import { RootState } from "../../../redux/store";
import { HeaderSection } from "../../UI/HeaderSection";
import { LayoutType } from "../../../types";

import styles from "./styles.module.scss";
import { StuffingHeaderSectionProducts } from "../StuffingHeaderSectionProducts";

export const SectionProducts: FC = () => {
  const { viewProducts, layoutType } = useSelector((state: RootState) => state.products);

  const productStyle = [styles.products__list];
  if (LayoutType[layoutType] === "vertical")
    productStyle.push(styles.products__list_vertical);
  if (LayoutType[layoutType] === "horizontal")
    productStyle.push(styles.products__list_gorizontal);

  return (
    <section className={styles.products}>
      <HeaderSection>
        <StuffingHeaderSectionProducts />
      </HeaderSection>
      {viewProducts.length === 0 ? (
        <div className={styles.notFound}>
          <div className={styles.notFound__img}></div>
          <span className={styles.notFound__taste}>
            Sorry, your taste is too refined!
          </span>
          <span>No products found</span>
        </div>
      ) : (
        <div className={productStyle.join(" ")}>
          {viewProducts.map((product) => (
            <ProductCard key={product.id} product={product} layoutType={layoutType} />
          ))}
        </div>
      )}
    </section>
  );
};
