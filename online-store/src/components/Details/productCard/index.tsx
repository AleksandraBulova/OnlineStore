import { FC } from "react";
import { Link } from "react-router-dom";
import { Route, Product } from "../../../types";
import { routes } from "../../../routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setProductsCart,
  resetProductsCart,
  setSumProducts,
  modalToggle,
} from "../../../redux/reducers/cartReducer";
import { setImg } from "../../../redux/reducers/productsReducer";

import { Button } from "../../../components/UI/Button";
import styles from "./styles.module.scss";

interface ProductCard {
  product: Product;
  activeImg: number;
  isInCart: number;
}

export const ProductCard: FC<ProductCard> = ({ product, activeImg, isInCart }) => {
  const { isModalShown } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [, cartPage]: Route[] = routes;

  const addToCard = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    product: Product
  ) => {
    event.stopPropagation();
    dispatch(setProductsCart(product));
    dispatch(setSumProducts());
  };

  const dropToCard = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    event.stopPropagation();
    dispatch(resetProductsCart({ product, buttonClick: "drop" }));
    dispatch(setSumProducts());
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.img}>
        <div className={styles.mini}>
          {product.photo.map((photo, index) => {
            const classNames = [styles.mini__item];
            if (index === activeImg) classNames.push(styles.mini__item_active);

            return (
              <div
                key={index + 1}
                className={classNames.join(" ")}
                style={{ backgroundImage: `url(${photo})` }}
                onClick={() => dispatch(setImg(index))}
              />
            );
          })}
        </div>
        <div
          className={styles.img__main}
          style={{ backgroundImage: `url(${product.photo[activeImg]})` }}
        ></div>
      </div>
      <ul className={[styles.productCard__description, styles.description].join(" ")}>
        <li className={styles.description__name}>{product.name}</li>
        <li className={styles.description__category}>
          <span className={styles.description__title}>Category:</span>
          {product.type}
        </li>
        <li className={styles.description__brand}>
          <span className={styles.description__title}>Brand:</span>
          {product.brand}
        </li>
        <li className={styles.description__description}>
          <span className={styles.description__title}>Info:</span>
          {product.description}
        </li>
        <li className={styles.description__stock}>
          <span className={styles.description__title}>Stock:</span> {product.stock}
        </li>
      </ul>
      <div className={styles.buy}>
        <span className={styles.buy__price}>{product.price} $</span>
        <Button
          text={isInCart !== -1 ? "Drop from cart" : "Add to cart"}
          isActive={isInCart !== -1 ? true : false}
          onClick={
            isInCart !== -1
              ? (event: React.MouseEvent<HTMLButtonElement>) => dropToCard(event, product)
              : (event: React.MouseEvent<HTMLButtonElement>) => addToCard(event, product)
          }
        />
        <Link
          className={styles.buy__link}
          onClick={
            isInCart === -1
              ? (event: React.MouseEvent<HTMLAnchorElement>) => {
                  addToCard(event, product);
                  dispatch(modalToggle(true));
                }
              : () => dispatch(modalToggle(true))
          }
          to={cartPage.path}
        >
          Buy now
        </Link>
      </div>
    </div>
  );
};
