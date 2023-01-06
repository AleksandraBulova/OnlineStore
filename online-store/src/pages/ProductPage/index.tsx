import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { Route } from "../../types";
import { routes } from "../../routes";

import { useSelector, useDispatch } from "react-redux";
import { setImg } from "../../redux/reducers/productsReducer";
import {
  setProductsCart,
  resetProductsCart,
  setSumProducts,
} from "../../redux/reducers/cartReducer";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Product } from "../../types";
import { Button } from "../../components/UI/Button";

import styles from "./styles.module.scss";

export const ProductPage: FC = () => {
  const { id } = useParams();
  const { products, activeImg } = useSelector(
    (state: RootState) => state.products
  );
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [mainPage, cartPage]: Route[] = routes;

  const product = products.find(
    (product) => product.id === Number(id)
  ) as Product;
  const delimiterStyles = [
    "fa-solid fa-caret-right",
    styles.breadCrumbs__delimiter,
  ];
  const isInCart = useMemo(() => {
    return productsCart.find((elem) => elem.id === product.id);
  }, [product, productsCart]);

  const addToCard = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
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

  return (
    <main className={styles.productPage}>
      <div className={styles.breadCrumbs}>
        <Link className={styles.breadCrumbs__link} to={mainPage.path}>
          Store
        </Link>
        <i className={delimiterStyles.join(" ")} />
        <span className={styles.breadCrumbs__item}>{product.type}</span>
        <i className={delimiterStyles.join(" ")} />
        <span className={styles.breadCrumbs__item}>{product.brand}</span>
        <i className={delimiterStyles.join(" ")} />
        <span className={styles.breadCrumbs__item}>{product.name}</span>
      </div>
      <div className={styles.productCard}>
        <div className={styles.img}>
          <div className={styles.mini}>
            {product.photo.map((photo, index) => {
              const classNames = [styles.mini__item];
              if (index === activeImg)
                classNames.push(styles.mini__item_active);

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
        <ul
          className={[styles.productCard__description, styles.description].join(
            " "
          )}
        >
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
            <span className={styles.description__title}>Stock:</span>{" "}
            {product.stock}
          </li>
        </ul>
        <div className={styles.buy}>
          <span className={styles.buy__price}>{product.price} $</span>
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
          <Link
            className={styles.buy__link}
            onClick={
              !isInCart
                ? (event: React.MouseEvent<HTMLAnchorElement>) =>
                    addToCard(event, product)
                : undefined
            }
            to={cartPage.path}
          >
            Buy now
          </Link>
        </div>
      </div>
    </main>
  );
};
