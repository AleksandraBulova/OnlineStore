import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProductsCart,
  resetProductsCart,
  setSumProducts,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { Product, LayoutType } from "../../../types";
import { Button } from "../../UI/Button";

import styles from "./styles.module.scss";

interface IProductCardProps {
  product: Product;
  layoutType: LayoutType;
}

export const ProductCard: FC<IProductCardProps> = ({ product, layoutType }) => {
  const navigate = useNavigate();

  const productStyle = [styles.product];
  if (LayoutType[layoutType] === "vertical")
    productStyle.push(styles.product_vertical);
  if (LayoutType[layoutType] === "horizontal")
    productStyle.push(styles.product_gorizontal);

  const { productsCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const addToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    dispatch(setProductsCart(product));
    dispatch(setSumProducts());
  };

  const dropToCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    dispatch(resetProductsCart({ product, buttonClick: "drop" }));
    dispatch(setSumProducts());
  };

  const isInCart = useMemo(() => {
    return productsCart.find((elem) => elem.id === product.id);
  }, [product, productsCart]);

  return (
    <div
      className={productStyle.join(" ")}
      onClick={() => navigate(`/product/alcohol/${product.id}`)}
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
