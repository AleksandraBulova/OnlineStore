import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface HeaderSectionProps {
  children: ReactNode;
}

export const HeaderSection: FC<HeaderSectionProps> = ({ children }) => {
  return <header className={styles.productsHeader}>{children}</header>;
};
