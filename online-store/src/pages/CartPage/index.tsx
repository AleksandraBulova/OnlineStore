import { FC } from "react"
import { SectionProductsCart } from "../../components/SectionProductsCart"

import styles from "./styles.module.scss"

export const CartPage: FC = () => {
  return (
    <main className={styles.cartPage}>
      <SectionProductsCart />
    </main>
  )
}
