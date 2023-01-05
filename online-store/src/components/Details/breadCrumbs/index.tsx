import { FC } from "react";
import { Link } from "react-router-dom";
import { Route, Product } from "../../../types";
import { routes } from "../../../routes";

import styles from "./styles.module.scss";

interface BreadCrumbs {
  product: Product;
}

export const BreadCrumbs: FC<BreadCrumbs> = ({ product }) => {
  const [mainPage]: Route[] = routes;
  const delimiterStyles = ["fa-solid fa-caret-right", styles.breadCrumbs__delimiter];

  return (
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
  );
};
