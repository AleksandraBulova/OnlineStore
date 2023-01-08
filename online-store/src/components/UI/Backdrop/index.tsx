import { FC } from "react";

import styles from "./styles.module.scss";

interface Backdrop {
  clickHandler: React.MouseEventHandler<HTMLDivElement>;
}

export const Backdrop: FC<Backdrop> = ({ clickHandler }) => {
  return <div className={styles.backDrop} onClick={clickHandler}></div>;
};
