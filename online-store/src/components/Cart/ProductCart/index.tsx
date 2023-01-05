import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetProductsCart,
  setProductsCart,
  setSumProducts,
} from "../../../redux/reducers/cartReducer";
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
  const { productsCart, limitOfProductsPerPage, pageOfProductsCart } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const addToCard = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    event.stopPropagation();
    dispatch(setProductsCart(product));
    dispatch(setSumProducts());
  };

  const removeToCard = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    event.stopPropagation();
    dispatch(
      resetProductsCart({
        product,
        buttonClick: "remove",
      })
    );
    dispatch(setSumProducts());
  };

  return (
    <div
      className={styles.productCard}
      onClick={() => navigate(`/product/alcohol/${product.id}`)}
    >
      <div className={styles.productCard__index}>{index}</div>
      <div
        className={styles.productCard__img}
        style={{ backgroundImage: `url(${product.photo[0]})` }}
      />
      <div className={[styles.productCard__productInfo, styles.productInfo].join(" ")}>
        <h3 className={styles.productInfo__name}>{product.name}</h3>
        <h5 className={styles.productInfo__text}>
          <span className={styles.productInfo__title}>Brand:</span>
          {product.brand}
        </h5>
        <p className={styles.productInfo__text}>
          <span className={styles.productInfo__title}>Description:</span>
          {product.description}
        </p>
      </div>
      <div className={[styles.productCard__value, styles.value].join(" ")}>
        <div>Stock: {product.stock}</div>
        <div className={styles.value__controls}>
          <Button
            text="-"
            isActive={false}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              removeToCard(event, product)
            }
          />
          <div>{productsCart.filter((item) => item.id === product.id).length}</div>
          <Button
            text="+"
            isActive={false}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              addToCard(event, product)
            }
          />
        </div>
        <div className={styles.value__price}>{`${product.price} $`}</div>
      </div>
    </div>
  );
};
