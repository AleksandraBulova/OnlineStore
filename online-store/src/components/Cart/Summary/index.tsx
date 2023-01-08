import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import {
  applyPromocode,
  setSearchPromo,
  modalToggle,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { Button } from "../../UI/Button";
import { Discounts } from "../Discounts";

import styles from "./styles.module.scss";

export const Summary: FC = () => {
  const { productsCart, sumProducts, promo, searchPromo, defultSumProducts } =
    useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const discount = promoCode.find((el) => el.value === searchPromo)?.discount as number;
  const withPromo = useMemo(() => {
    return Object.values(promo).some((el) => el);
  }, [promo]);

  return (
    <div className={styles.summary}>
      <div>
        <span className={styles.summary__title}>Products:</span>
        {productsCart.length}
      </div>
      <div
        className={styles.summary__price}
        style={{ textDecoration: withPromo ? "line-through" : "" }}
      >
        <span className={styles.summary__title}>Total:</span>
        {defultSumProducts} $
      </div>
      {withPromo && (
        <div className={styles.summary__price}>
          {" "}
          <span className={styles.summary__title}>Total:</span> {sumProducts} $
        </div>
      )}
      {withPromo && <Discounts promo={promo} />}
      <input
        className={styles.summary__input}
        type="text"
        placeholder="Enter promo code"
        onChange={(event) => {
          dispatch(
            setSearchPromo(
              promoCode.find((el) => el.value === event.target.value.toUpperCase())?.value
            )
          );
        }}
      />
      {searchPromo ? (
        <div className={styles.summary__addPromo}>
          <div
            className={styles.summary__promoInfo}
          >{`${searchPromo} - ${discount}%`}</div>
          {!promo[searchPromo] && (
            <Button
              text="Add"
              isActive={false}
              onClick={() => dispatch(applyPromocode(discount))}
            />
          )}
        </div>
      ) : null}
      <p className={styles.summary__promo}>
        <span className={styles.summary__title}>Promo for test:</span>'XK3M9S', 'DV8Q6L'
      </p>
      <Button
        text="Buy now"
        isActive={false}
        onClick={() => dispatch(modalToggle(true))}
      />
    </div>
  );
};
