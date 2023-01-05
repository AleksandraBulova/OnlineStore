import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface IButton {
  text?: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button: FC<IButton> = ({ text, isActive, onClick, children }) => {
  const style: Array<string> = [styles.btn];

  if (isActive) style.push(styles.active);

  return (
    <button className={style.join(" ")} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};
