import { FC } from "react";
import { useSelector } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import { RootState } from "../../../redux/store";
import { Button } from "../../UI/Button";
import { HeaderSection } from "../../UI/HeaderSection";

export const Discounts: FC = () => {
  const { promo } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <HeaderSection>
        <h3>Applied codes</h3>
      </HeaderSection>
      {Object.entries(promo).map((elem) => {
        return elem[1] === true
          ? promoCode.map((item, index) =>
              item.value === elem[0] ? (
                <div key={index}>
                  <div>{`${item.value} - ${item.discount}%`}</div>
                  <Button text="Drop" isActive={false} onClick={() => null} />
                </div>
              ) : null
            )
          : null;
      })}
    </>
  );
};
