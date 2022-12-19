import { FC } from "react"

import styles from "./styles.module.scss"

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.authorInfo}>
        <div className={styles.authorInfo__item}>
          <a href="https://rs.school/js/">
            <img src="https://rs.school/images/rs_school_js.svg" alt="RS School" />
          </a>
        </div>
        <div className={styles.authorInfo__item}>
          <span>2022</span>
        </div>
        <div className={styles.authorInfo__item}>
          <div className={styles.github}>
            <i className={`fa-brands fa-github ${styles.github__icon}`}></i>
            <a
              className={styles.github__link}
              href="https://github.com/AleksandraBulova"
              target="_blank"
            >
              AleksandraBulova
            </a>
            <span> / </span>
            <a
              className={styles.github__link}
              href="https://github.com/RussianBoy64"
              target="_blank"
            >
              RussianBoy64
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
