import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HeaderSectionProductsCart } from "../HeaderSectionProductsCart";
import { ProductCart } from "../ProductCart";

import styles from "./styles.module.scss";

export const SectionProductsCart: FC = () => {
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const uniqueProductsCart = Array.from(new Set(productsCart));
  console.log(productsCart);

  return (
    <>
      <HeaderSectionProductsCart />
      {uniqueProductsCart.map((product, index) => {
        return <ProductCart key={index} product={product} index={index} />;
      })}
    </>
  );
};
