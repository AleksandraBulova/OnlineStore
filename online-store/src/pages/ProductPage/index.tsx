import { FC } from "react";
import { Link } from "react-router-dom";
import { Route } from "../../types";
import { routes } from "../../routes";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/Main/ProductCard";
import { RootState } from "../../redux/store";
import { Product } from "../../types";

import styles from "./styles.module.scss";

export const ProductPage: FC = () => {
  const { id } = useParams();
  const { products, layoutType } = useSelector((state: RootState) => state.products);
  const [mainPage]: Route[] = routes;

  const product = products.find((product) => product.id === Number(id)) as Product;

  const delimiterStyles = ["fa-solid fa-caret-right", styles.breadCrumbs__delimiter];

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
      <ProductCard product={product} layoutType={layoutType} />
    </main>
  );
};
