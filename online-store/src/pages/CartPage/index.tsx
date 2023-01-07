import { FC } from "react";
import { useSelector } from "react-redux";
import { SectionProductsCart } from "../../components/Cart/SectionProductsCart";
import { SectionSummary } from "../../components/Cart/SectionSummary";
import { ModalCheckoutWindow } from "../../components/Modal/ModalCheckoutWindow";
import { RootState } from "../../redux/store";

import styles from "./styles.module.scss";

export const CartPage: FC = () => {
  const { productsCart, limitOfProductsPerPage, pageOfProductsCart } = useSelector(
    (state: RootState) => state.cart
  );

  // getQueryCart(limitOfProductsPerPage, pageOfProductsCart);

  return (
    <main className={styles.cartPage}>
      {productsCart.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.empty__img}></div>
          <h3 className={styles.empty__text}>Cart is Empty</h3>
        </div>
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
