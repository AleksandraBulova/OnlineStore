import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Product } from "../../types";
import { BreadCrumbs } from "../../components/Details/breadCrumbs";
import { ProductCard } from "../../components/Details/productCard";

import styles from "./styles.module.scss";

export const ProductPage: FC = () => {
  const { id } = useParams();
  const { products, activeImg } = useSelector((state: RootState) => state.products);
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const product = products.find((product) => product.id === Number(id)) as Product;
  const isInCart = useMemo(() => {
    return productsCart.findIndex((elem) => elem.id === product.id);
  }, [product, productsCart]);

  return (
    <main className={styles.productPage} data-testid="productPage-content">
      <BreadCrumbs product={product} />
      <ProductCard product={product} activeImg={activeImg} isInCart={isInCart} />
    </main>
  );
};
