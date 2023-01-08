import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { modalToggle, clearCart } from "../../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

export const ModaleSuccessOrder: FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft === 0) {
      dispatch(clearCart());
      dispatch(modalToggle(false));
      navigate("/");
    }
    const timer = setTimeout(() => {
      setSecondsLeft((secondsLeft) => (secondsLeft >= 1 ? secondsLeft - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <p className={styles.order}>Thank you for your order!</p>
      <p className={styles.redirect}>
        You will redirect to the store in {secondsLeft} seconds!
      </p>
    </>
  );
};
