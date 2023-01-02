import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetProductsCart,
  setProductsCart,
} from "../../../redux/reducers/cartReduser";
import { RootState } from "../../../redux/store";
import { Product } from "../../../types";
import { Button } from "../../UI/Button";

import styles from "./styles.module.scss";

interface IProductCardProps {
  product: Product;
  index: number;
}

export const ProductCart: FC<IProductCardProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const addToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    dispatch(setProductsCart(product));
  };

  const dropToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    console.log(product, "product");
    dispatch(
      resetProductsCart({
        product,
        buttonClick: "remove",
      })
    );
  };

  return (
    <div onClick={() => navigate(`/product/${product.id}`)}>
      <div>{index + 1}</div>
      <div>
        <img src={product.photo[0]} alt="product" />
        <div>
          <h3>{product.name}</h3>
          <h5>{product.brand}</h5>
          <p>{product.description}</p>
        </div>
        <div>
          <div>Stock: {product.stock}</div>
          <div>
            <Button
              text="-"
              isActive={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                dropToCard(event, product)
              }
            />
            <div>
              {productsCart.filter((item) => item.id === product.id).length}
            </div>
            <Button
              text="+"
              isActive={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                addToCard(event, product)
              }
            />
          </div>
          <div>{`$${product.price}`}</div>
        </div>
      </div>
    </div>
  );
};
