import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import {
  changePrise,
  setSearchPromo,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { Button } from "../../UI/Button";
import { Discounts } from "../Discounts";

export const Summary: FC = () => {
  const { productsCart, sumProducts, searchPromo } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  const discount = promoCode.find((el) => el.value === searchPromo)
    ?.discount as number;

  return (
    <div>
      <div>Products: {productsCart.length}</div>
      <div>Total: ${sumProducts}</div>
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
          <Button
            text="Add"
            isActive={false}
            onClick={() => dispatch(changePrise(discount))}
          />
        </div>
      ) : null}
      <p>Promo for test: 'XK3M9S', 'DV8Q6L'</p>
      <Button text="Buy now" isActive={false} onClick={() => null} />
      <Discounts />
    </div>
  );
};
