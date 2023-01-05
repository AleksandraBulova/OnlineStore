import { FC } from "react";
import { HeaderSection } from "../../UI/HeaderSection";
import { Summary } from "../Summary";

import styles from "./styles.module.scss";

export const SectionSummary: FC = () => {
  return (
    <section>
      <HeaderSection>
        <h2 className={styles.title}>Summary</h2>
      </HeaderSection>
      <Summary />
    </section>
  );
};
