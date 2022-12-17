import { FC } from "react"
import { useSelector } from "react-redux"
import { ProductCard } from "../ProductCard"
import { RootState } from "../../redux/store"
import { HeaderSectionProducts } from "../HeaderSectionProducts"

import styles from "./styles.module.scss"

export const SectionProducts: FC = () => {
  const { viewProducts } = useSelector((state: RootState) => state.products)

  return (
    <section className={styles.products}>
      <HeaderSectionProducts />
      <div className={styles.products__list}>
        {viewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
