import { FC } from "react";
import { HeaderSection } from "../../UI/HeaderSection";
import { Summary } from "../Summary";

export const SectionSummary: FC = () => {
  return (
    <>
      <HeaderSection>
        <h2>Summary</h2>
      </HeaderSection>
      <Summary />
    </>
  );
};
