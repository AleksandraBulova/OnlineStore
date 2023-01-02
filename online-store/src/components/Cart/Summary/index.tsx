import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Button } from "../../UI/Button";

export const Summary: FC = () => {
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const sumProducts = productsCart.reduce(
    (acc, product) => acc + product.price,
    0
  );

  return (
    <div>
      <div>Products: {productsCart.length}</div>
      <div>Total: ${sumProducts}</div>
      <input type="text" placeholder="Enter promo code" />
      <p>Promo for test: 'XK3M9S', 'DV8Q6L'</p>
      <Button text="Buy now" isActive={false} onClick={() => null} />
    </div>
  );
};
