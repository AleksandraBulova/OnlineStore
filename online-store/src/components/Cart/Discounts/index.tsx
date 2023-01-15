import { FC } from "react";
import { useDispatch } from "react-redux";
import { promoCode } from "../../../constants/promoCode";
import { dropPromo } from "../../../redux/reducers/cartReducer";
import { Button } from "../../UI/Button";
import { HeaderSection } from "../../UI/HeaderSection";

import styles from "./styles.module.scss";

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
        <h3 className={styles.promo__title}>Applied codes</h3>
      </HeaderSection>
      {Object.entries(promo).map((elem) => {
        return elem[1] === true
          ? promoCode.map((item, index) =>
              item.value === elem[0] ? (
                <div className={styles.promo__item} key={index}>
                  <div
                    className={styles.promo__code}
                  >{`${item.value} - ${item.discount}%`}</div>
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
