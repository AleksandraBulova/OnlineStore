import { FC } from "react";
import { Link } from "react-router-dom";
import { Route } from "../../types";
import { routes } from "../../routes";

import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Header: FC = () => {
  const [mainPage, cartPage]: Route[] = routes;
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const sumProducts = productsCart.reduce(
    (acc, product) => acc + product.price,
    0
  );

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link className={styles.logo} to={mainPage.path}>
          <img className={styles.logo__img} src={logo} alt="Logo" />
          <h1 className={styles.logo__text}>Online store</h1>
        </Link>
        <div>Cart total: ${sumProducts}</div>
        <Link to={cartPage.path}>
          {productsCart.length === 0 ? "Cart" : `Cart: ${productsCart.length}`}
        </Link>
      </div>
    </header>
  );
};
