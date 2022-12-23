import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProductsCart,
  resetProductsCart,
} from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";
import { IProduct } from "../../types";
import { Button } from "../UI/Button";

import styles from "./styles.module.scss";

interface IProductCardProps {
  product: IProduct;
  view?: "vertical" | "gorizontal";
}

export const ProductCard: FC<IProductCardProps> = ({
  product,
  view = "vertical",
}) => {
  const navigate = useNavigate();

  const viewStyle = {
    vertical: styles.product_vertical,
    gorizontal: styles.product_gorizontal,
  };

  const productStyle = [styles.product, viewStyle[view]].join(" ");

  const { productsCart } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const addToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => {
    event.stopPropagation();
    dispatch(setProductsCart(product));
  };

  const dropToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => {
    event.stopPropagation();
    dispatch(resetProductsCart(product));
  };

  const isInCart = useMemo(() => {
    return productsCart.find((elem) => elem.id === product.id);
  }, [product, productsCart]);

  return (
    <div
      className={productStyle}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className={styles.img}>
        <div className={styles.img__pagination_left}></div>
        <div className={styles.img__pagination_right}></div>
        <div className={styles.img__itemWrapper}>
          {product.photo.map((photo, index) => {
            return (
              <div
                key={index + 1}
                className={styles.img__item}
                style={{ backgroundImage: `url(${photo})` }}
              />
            );
          })}
        </div>
        <div className={styles.img__bullets}>
          <span className={styles.img__bullets__item}></span>
          <span className={styles.img__bullets__item}></span>
        </div>
      </div>
      <h3 className={styles.product__name}>{product.name}</h3>
      <ul className={styles.info}>
        <li className={styles.info__brand}>{product.brand}</li>
        <li className={styles.info__description}>{product.description}</li>
        <li className={styles.info__category}> {product.type}</li>
        <li className={styles.info__stock}>Stock: {product.stock}</li>
        <li className={styles.info__price}>{`${product.price} $`}</li>
      </ul>
      <Button
        text={isInCart ? "Drop from cart" : "Add to cart"}
        isActive={Boolean(isInCart)}
        onClick={
          isInCart
            ? (event: React.MouseEvent<HTMLButtonElement>) =>
                dropToCard(event, product)
            : (event: React.MouseEvent<HTMLButtonElement>) =>
                addToCard(event, product)
        }
      />
    </div>
  );
};
