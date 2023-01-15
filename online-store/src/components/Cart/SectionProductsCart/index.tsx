import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProductCart } from "../ProductCart";
import { HeaderSection } from "../../UI/HeaderSection";
import { StuffingHeaderSectionProductsCart } from "../StuffingHeaderSectionProductsCart";
import { Product } from "../../../types";
import { getUniqueProducts } from "../../../utils/getUniqueProducts";

import styles from "./styles.module.scss";

export const SectionProductsCart: FC = () => {
  const { productsCart, pageOfProductsCart, limitOfProductsPerPage } = useSelector(
    (state: RootState) => state.cart
  );

  const viewProducts = useMemo(() => {
    const uniqueProductsCart = getUniqueProducts(productsCart);

    const newViewProducts = uniqueProductsCart.reduce(
      (acc: Array<Product & { index: number }>[], curr: Product, index: number) => {
        const newValue = [...acc];
        const stateIndex = Math.floor(index / limitOfProductsPerPage);

        newValue[stateIndex] = [...newValue[stateIndex], { ...curr, index }];

        return newValue;
      },
      new Array(Math.ceil(uniqueProductsCart.length / limitOfProductsPerPage)).fill([])
    );

    return newViewProducts[pageOfProductsCart - 1];
  }, [productsCart, pageOfProductsCart, limitOfProductsPerPage]);

  return (
    <section className={styles.productCartSection}>
      <HeaderSection>
        <StuffingHeaderSectionProductsCart />
      </HeaderSection>
      {viewProducts.map((product, index) => {
        return <ProductCart key={index} product={product} index={product.index + 1} />;
      })}
    </section>
  );
};
