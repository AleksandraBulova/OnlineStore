import { FC } from "react"
import { Link } from "react-router-dom"
import { IRoute } from "../../types"
import { routes } from "../../routes"

import logo from "../../assets/logo.png"
import styles from "./styles.module.scss"

export const Header: FC = () => {
  const [mainPage]: IRoute[] = routes
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link className={styles.logo} to={mainPage.path}>
          <img className={styles.logo__img} src={logo} alt="Logo" />
          <h1 className={styles.logo__text}>Online store</h1>
        </Link>
      </div>
    </header>
  )
}
