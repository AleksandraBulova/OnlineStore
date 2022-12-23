import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HeaderSectionProductsCart } from "../HeaderSectionProductsCart";
import { ProductCart } from "../ProductCart";

import styles from "./styles.module.scss";

export const SectionProductsCart: FC = () => {
  const { productsCart } = useSelector((state: RootState) => state.products);
  console.log(productsCart);

  return (
    <>
      <HeaderSectionProductsCart />
      {productsCart.map((product, index) => {
        return <ProductCart key={index} product={product} index={index} />;
      })}
    </>
  );
};
