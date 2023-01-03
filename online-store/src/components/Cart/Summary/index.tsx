import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import { setSearchPromo } from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { PromoCode } from "../../../types";
import { Button } from "../../UI/Button";

export const Summary: FC = () => {
  const { productsCart, searchPromo } = useSelector(
    (state: RootState) => state.cart
  );
  const sumProducts = productsCart.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const dispatch = useDispatch();

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
                (el) => el.value.toUpperCase() === event.target.value
              )?.value
            )
          );
        }}
      />
      {searchPromo ? (
        <div>
          <div>
            {`${searchPromo} - ${
              promoCode.find((el) => el.value === searchPromo)?.discount
            }%`}
          </div>
          <Button text="Add" isActive={false} onClick={() => null} />{" "}
        </div>
      ) : null}
      <p>Promo for test: 'XK3M9S', 'DV8Q6L'</p>
      <Button text="Buy now" isActive={false} onClick={() => null} />
    </div>
  );
};
