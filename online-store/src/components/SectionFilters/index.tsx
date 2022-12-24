import { FC } from "react"
import { useDispatch } from "react-redux"
import { resetFilter } from "../../redux/reducers/productsReducer"
import { BrandFilter } from "../BrandFilter"
import { CaregoryFilter } from "../CategoryFilter"
import { Button } from "../UI/Button"

import styles from "./styles.module.scss"

export const SectionFilters: FC = () => {
  const dispatch = useDispatch()
  const copyLink = () => alert("TODO: Реализовать копирование поисковой строки")
  const resetFilters = () => dispatch(resetFilter())

  return (
    <section className={styles.filters}>
      <div className={styles.filters__buttons}>
        <Button text="Copy" isActive={false} onClick={copyLink} />
        <Button text="Reset" isActive={false} onClick={resetFilters} />
      </div>
      <CaregoryFilter />
      <BrandFilter />
    </section>
  )
}
