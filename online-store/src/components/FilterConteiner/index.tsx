import { FC, ReactNode } from "react"

import styles from "./styles.module.scss"

interface filterContainer {
  title: string
  children: ReactNode
}

export const FilterContainer: FC<filterContainer> = ({ title, children }) => {
  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.filterContainer__title}>{title}</h2>
      <div className={styles.filterContainer__filters}>{children}</div>
    </div>
  )
}
