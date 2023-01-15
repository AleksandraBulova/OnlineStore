import { FC } from "react";

import styles from "./styles.module.scss";

export const Page404: FC = () => {
  return (
    <main className={styles.pageNotFound}>
      <span className={styles.pageNotFound__logo}></span>
      <span className={styles.pageNotFound__404}>404</span>
      <span className={styles.pageNotFound__text}>Page not found!</span>
    </main>
  );
};
