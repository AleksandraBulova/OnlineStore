import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { modalToggle } from "../../redux/reducers/cartReducer";
import { SectionProductsCart } from "../../components/Cart/SectionProductsCart";
import { SectionSummary } from "../../components/Cart/SectionSummary";
import { Backdrop } from "../../components/UI/Backdrop";
import { ModalCheckoutWindow } from "../../components/Modal/ModalCheckoutWindow";

import styles from "./styles.module.scss";

export const CartPage: FC = () => {
  const { productsCart, limitOfProductsPerPage, pageOfProductsCart, isModalShown } =
    useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

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
      {isModalShown && (
        <>
          <ModalCheckoutWindow />
          <Backdrop clickHandler={() => dispatch(modalToggle(false))} />
        </>
      )}
    </main>
  );
};
