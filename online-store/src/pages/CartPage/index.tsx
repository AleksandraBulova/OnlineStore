import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  modalToggle,
  setModalSubmitted,
  setSecondsToRedirect,
} from "../../redux/reducers/cartReducer";
import { SectionProductsCart } from "../../components/Cart/SectionProductsCart";
import { SectionSummary } from "../../components/Cart/SectionSummary";
import { Backdrop } from "../../components/UI/Backdrop";
import { ModalCheckoutWindow } from "../../components/Modal/ModalCheckoutWindow";

import styles from "./styles.module.scss";

export const CartPage: FC = () => {
  const { productsCart, isModalShown, isModalSubmitted, secondsToRedirect } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsToRedirect === 0) {
      dispatch(modalToggle(false));
      dispatch(setModalSubmitted(false));
      dispatch(setSecondsToRedirect(3));
      navigate("/");
    }

    const timer = setTimeout(() => {
      isModalSubmitted && dispatch(setSecondsToRedirect(secondsToRedirect - 1));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isModalSubmitted, secondsToRedirect]);

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
