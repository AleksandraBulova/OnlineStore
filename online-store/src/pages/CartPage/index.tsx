import { FC } from "react";
import { useSelector } from "react-redux";
import { SectionProductsCart } from "../../components/Cart/SectionProductsCart";
import { SectionSummary } from "../../components/Cart/SectionSummary";
import { RootState } from "../../redux/store";
import { getQueryCart } from "../../utils/getQueryCart";

import styles from "./styles.module.scss";

export const CartPage: FC = () => {
  const { productsCart, limitOfProductsPerPage, pageOfProductsCart } =
    useSelector((state: RootState) => state.cart);

  // getQueryCart(limitOfProductsPerPage, pageOfProductsCart);

  return (
    <main className={styles.cartPage}>
      {productsCart.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          <SectionProductsCart />
          <SectionSummary />
        </>
      )}
    </main>
  );
};
