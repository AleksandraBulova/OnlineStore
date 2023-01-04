import { FC } from "react";
import { useDispatch } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import { dropPromo } from "../../../redux/reducers/cartReducer";
import { Button } from "../../UI/Button";
import { HeaderSection } from "../../UI/HeaderSection";

interface Props {
  promo: {
    [key: string]: boolean;
  };
}

export const Discounts: FC<Props> = ({ promo }) => {
  const dispatch = useDispatch();

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
                  <Button
                    text="Drop"
                    isActive={false}
                    onClick={() => dispatch(dropPromo(item.value))}
                  />
                </div>
              ) : null
            )
          : null;
      })}
    </>
  );
};
