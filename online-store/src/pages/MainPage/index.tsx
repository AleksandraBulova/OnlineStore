import { FC } from "react"
import { SectionProducts } from "../../components/SectionProducts"
import { SectionFilters } from "../../components/SectionFilters"

import styles from "./styles.module.scss"

export const MainPage: FC = () => {
  return (
    <main className={styles.mainPage}>
      <SectionFilters />
      <SectionProducts />
    </main>
  )
}
