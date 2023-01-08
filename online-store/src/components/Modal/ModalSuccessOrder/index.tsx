import { FC } from "react";

import styles from "./styles.module.scss";

interface ModalSuccessOrder {
  timeLeft: number;
}

export const ModaleSuccessOrder: FC<ModalSuccessOrder> = ({ timeLeft }) => {
  return (
    <>
      <p className={styles.order}>Thank you for your order!</p>
      <p className={styles.redirect}>
        You will redirect to the store in {timeLeft} seconds!
      </p>
    </>
  );
};
