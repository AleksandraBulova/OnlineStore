import { FC } from "react";
import { useSelector } from "react-redux";
import { SectionProductsCart } from "../../components/Cart/SectionProductsCart";
import { SectionSummary } from "../../components/Cart/SectionSummary";
import { ModalCheckoutWindow } from "../../components/Modal/ModalCheckoutWindow";
import { RootState } from "../../redux/store";

import styles from "./styles.module.scss";

export const CartPage: FC = () => {
  const { productsCart } = useSelector((state: RootState) => state.cart);

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
      <ModalCheckoutWindow />
    </main>
  );
};
