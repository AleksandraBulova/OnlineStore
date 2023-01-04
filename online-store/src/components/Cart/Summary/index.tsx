import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import {
  applyPromocode,
  setSearchPromo,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { Button } from "../../UI/Button";
import { Discounts } from "../Discounts";

export const Summary: FC = () => {
  const { productsCart, sumProducts, promo, searchPromo, defultSumProducts } =
    useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const discount = promoCode.find((el) => el.value === searchPromo)
    ?.discount as number;
  const withPromo = useMemo(() => {
    return Object.values(promo).some((el) => el);
  }, [promo]);

  return (
    <div>
      <div>Products: {productsCart.length}</div>
      <div style={{ textDecoration: withPromo ? "line-through" : "" }}>
        Total: ${defultSumProducts}
      </div>
      {withPromo && <div>Total: ${sumProducts}</div>}
      {withPromo && <Discounts promo={promo} />}
      <input
        type="text"
        placeholder="Enter promo code"
        onChange={(event) => {
          dispatch(
            setSearchPromo(
              promoCode.find(
                (el) => el.value === event.target.value.toUpperCase()
              )?.value
            )
          );
        }}
      />
      {searchPromo ? (
        <div>
          <div>{`${searchPromo} - ${discount}%`}</div>
          {!promo[searchPromo] && (
            <Button
              text="Add"
              isActive={false}
              onClick={() => dispatch(applyPromocode(discount))}
            />
          )}
        </div>
      ) : null}
      <p>Promo for test: 'XK3M9S', 'DV8Q6L'</p>
      <Button text="Buy now" isActive={false} onClick={() => null} />
    </div>
  );
};
