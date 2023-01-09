import React, { FC, FocusEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  clearCart,
  setModalSubmitted,
} from "../../../redux/reducers/cartReducer";
import { ModalInputsTypes, PaymentSystem } from "../../../types";
import { InputModal } from "../InputModal";
import { Button } from "../../UI/Button";
import { ModaleSuccessOrder } from "../ModalSuccessOrder";

import styles from "./styles.module.scss";

export const ModalCheckoutWindow: FC = () => {
  const dispatch = useDispatch();
  const { isModalSubmitted, secondsToRedirect } = useSelector(
    (state: RootState) => state.cart
  );
  const [inputStates, setInputStates] = useState({
    name: { value: "", error: false, isValid: false },
    tel: { value: "", error: false, isValid: false },
    address: { value: "", error: false, isValid: false },
    email: { value: "", error: false, isValid: false },
    cardNum: {
      value: "",
      error: false,
      isValid: false,
      paySystem: PaymentSystem.paypal,
    },
    cardThru: { value: "", error: false, isValid: false },
    CVV: { value: "", error: false, isValid: false },
  });

  const paySystemStyles = [styles.paySystem];

  switch (inputStates.cardNum.paySystem) {
    case PaymentSystem.visa:
      paySystemStyles.push(styles.paySystem_visa);
      break;
    case PaymentSystem.mastercard:
      paySystemStyles.push(styles.paySystem_mastercard);
      break;
    case PaymentSystem.amex:
      paySystemStyles.push(styles.paySystem_amex);
      break;
    case PaymentSystem.paypal:
      paySystemStyles.push(styles.paySystem_paypal);
      break;
  }

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: ModalInputsTypes
  ) => {
    const eventTarget = event.target;

    switch (type) {
      case ModalInputsTypes.name:
        setInputStates((prev) => {
          if (eventTarget.value.length > 25)
            eventTarget.value = eventTarget.value.substring(0, 25);
          return {
            ...prev,
            name: { ...prev.name, value: eventTarget.value },
          };
        });
        break;
      case ModalInputsTypes.tel:
        setInputStates((prev) => {
          if (eventTarget.value.length > 25)
            eventTarget.value = eventTarget.value.substring(0, 25);
          return {
            ...prev,
            tel: { ...prev.tel, value: eventTarget.value },
          };
        });
        break;
      case ModalInputsTypes.address:
        setInputStates((prev) => {
          if (eventTarget.value.length > 25)
            eventTarget.value = eventTarget.value.substring(0, 25);
          return {
            ...prev,
            address: { ...prev.address, value: eventTarget.value },
          };
        });
        break;
      case ModalInputsTypes.email:
        setInputStates((prev) => {
          if (eventTarget.value.length > 25)
            eventTarget.value = eventTarget.value.substring(0, 25);
          return {
            ...prev,
            email: { ...prev.email, value: eventTarget.value },
          };
        });
        break;
      case ModalInputsTypes.cardNum:
        setInputStates((prev) => {
          const currentCaretePosition = eventTarget.selectionStart as number;
          eventTarget.value = eventTarget.value.replace(/[^0-9]/g, "");
          if (eventTarget.value.length > 16)
            eventTarget.value = eventTarget.value.substring(0, 16);
          let template = "XXXX XXXX XXXX XXXX";
          let paySystem;
          const numbersArr = eventTarget.value.split("");
          numbersArr.forEach(
            (number) => (template = template.replace(/X/, number))
          );
          eventTarget.value = template;
          const lastXIndex = template.indexOf("X");
          const lastSpaceIndex = template.indexOf(" X");
          const caretePosition =
            lastXIndex - lastSpaceIndex === 1
              ? lastXIndex - 1
              : lastXIndex !== -1
              ? lastXIndex
              : 19;
          eventTarget.selectionStart =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;
          eventTarget.selectionEnd =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;

          switch (eventTarget.value[0]) {
            case "4":
              paySystem = PaymentSystem.visa;
              break;
            case "5":
              paySystem = PaymentSystem.mastercard;
              break;
            case "6":
              paySystem = PaymentSystem.amex;
              break;
            default:
              paySystem = PaymentSystem.paypal;
              break;
          }
          return {
            ...prev,
            cardNum: {
              ...prev.cardNum,
              value: eventTarget.value,
              paySystem: paySystem,
            },
          };
        });
        break;
      case ModalInputsTypes.cardThru:
        setInputStates((prev) => {
          const currentCaretePosition = eventTarget.selectionStart as number;
          eventTarget.value = eventTarget.value.replace(/[^0-9]/g, "");
          if (eventTarget.value.length > 4)
            eventTarget.value = eventTarget.value.substring(0, 4);
          let template = "XX/XX";
          const numbersArr = eventTarget.value.split("");
          numbersArr.forEach(
            (number) => (template = template.replace(/X/, number))
          );
          eventTarget.value = template;
          const lastXIndex = template.indexOf("X");
          const lastSpaceIndex = template.indexOf("/X");
          const caretePosition =
            lastXIndex - lastSpaceIndex === 1
              ? lastXIndex - 1
              : lastXIndex !== -1
              ? lastXIndex
              : 5;
          eventTarget.selectionStart =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;
          eventTarget.selectionEnd =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;
          return {
            ...prev,
            cardThru: {
              ...prev.cardThru,
              value: eventTarget.value,
            },
          };
        });
        break;

      case ModalInputsTypes.CVV:
        setInputStates((prev) => {
          const currentCaretePosition = eventTarget.selectionStart as number;
          eventTarget.value = eventTarget.value.replace(/[^0-9]/g, "");
          if (eventTarget.value.length > 3)
            eventTarget.value = eventTarget.value.substring(0, 3);
          let template = "XXX";
          const numbersArr = eventTarget.value.split("");
          numbersArr.forEach(
            (number) => (template = template.replace(/X/, number))
          );
          eventTarget.value = template;
          const caretePosition = template.indexOf("X");
          eventTarget.selectionStart =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;
          eventTarget.selectionEnd =
            caretePosition - currentCaretePosition > 1
              ? currentCaretePosition
              : caretePosition;
          return {
            ...prev,
            CVV: {
              ...prev.CVV,
              value: eventTarget.value,
            },
          };
        });
        break;
    }
  };

  const handleBlurValue = (
    event: FocusEvent<HTMLInputElement>,
    type: ModalInputsTypes
  ): void => {
    const eventTarget = event.target;
    const valueArray = eventTarget.value.split(" ");
    const valueArrayForTel = eventTarget.value.split("");
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    switch (type) {
      case ModalInputsTypes.name:
        if (valueArray.length >= 2) {
          const check = valueArray
            .join(" ")
            .split("")
            .map((item) => {
              return item < "0" || item > "9" ? true : false;
            });
          if (
            valueArray[0].length >= 3 &&
            valueArray[1].length >= 3 &&
            check.every((elem) => elem)
          ) {
            setInputStates((prev) => ({
              ...prev,
              name: { ...prev.name, error: false, isValid: true },
            }));
            break;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          name: { ...prev.name, error: true, isValid: false },
        }));
        break;

      case ModalInputsTypes.tel:
        if (valueArrayForTel.length >= 10 && valueArrayForTel[0] === "+") {
          const check = valueArrayForTel
            .slice(+valueArrayForTel[1])
            .map((item) => {
              return item < "0" || item > "9" ? false : true;
            });
          if (check.every((elem) => elem)) {
            setInputStates((prev) => ({
              ...prev,
              tel: { ...prev.tel, error: false, isValid: true },
            }));
            break;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          tel: { ...prev.tel, error: true, isValid: false },
        }));
        break;

      case ModalInputsTypes.address:
        if (valueArray.length >= 3) {
          if (
            valueArray[0].length >= 5 &&
            valueArray[1].length >= 5 &&
            valueArray[2].length >= 5
          ) {
            setInputStates((prev) => ({
              ...prev,
              address: { ...prev.address, error: false, isValid: true },
            }));
            break;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          address: { ...prev.address, error: true, isValid: false },
        }));
        break;

      case ModalInputsTypes.email:
        if (EMAIL_REGEXP.test(eventTarget.value)) {
          setInputStates((prev) => ({
            ...prev,
            email: { ...prev.email, error: false, isValid: true },
          }));
          break;
        }
        setInputStates((prev) => ({
          ...prev,
          email: { ...prev.email, error: true, isValid: false },
        }));
        break;

      case ModalInputsTypes.cardNum:
        if (eventTarget.value[0] === "0" || eventTarget.value.includes("X")) {
          setInputStates((prev) => ({
            ...prev,
            cardNum: { ...prev.cardNum, error: true, isValid: false },
          }));
          break;
        }

        setInputStates((prev) => ({
          ...prev,
          cardNum: { ...prev.cardNum, error: false, isValid: true },
        }));
        break;

      case ModalInputsTypes.cardThru:
        if (
          Number(eventTarget.value.substring(0, 2)) === 0 ||
          Number(eventTarget.value.substring(0, 2)) > 12 ||
          Number(eventTarget.value.substring(3)) < 23 ||
          eventTarget.value.includes("X")
        ) {
          setInputStates((prev) => ({
            ...prev,
            cardThru: { ...prev.cardThru, error: true, isValid: false },
          }));
          break;
        }

        setInputStates((prev) => ({
          ...prev,
          cardThru: { ...prev.cardThru, error: false, isValid: true },
        }));
        break;

      case ModalInputsTypes.CVV:
        if (eventTarget.value.includes("X")) {
          setInputStates((prev) => ({
            ...prev,
            CVV: { ...prev.CVV, error: true, isValid: false },
          }));
          break;
        }

        setInputStates((prev) => ({
          ...prev,
          CVV: { ...prev.CVV, error: false, isValid: true },
        }));
        break;
    }
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const isFormValid = !Object.entries(inputStates).filter(
      (inputState) => !inputState[1].isValid
    ).length;

    if (isFormValid) {
      dispatch(clearCart());
      dispatch(setModalSubmitted(true));
    } else {
      setInputStates((prev) => ({
        name: { ...prev.name, error: prev.name.isValid ? false : true },
        tel: { ...prev.tel, error: prev.tel.isValid ? false : true },
        address: {
          ...prev.address,
          error: prev.address.isValid ? false : true,
        },
        email: { ...prev.email, error: prev.email.isValid ? false : true },
        cardNum: {
          ...prev.cardNum,
          error: prev.cardNum.isValid ? false : true,
        },
        cardThru: {
          ...prev.cardThru,
          error: prev.cardThru.isValid ? false : true,
        },
        CVV: { ...prev.CVV, error: prev.CVV.isValid ? false : true },
      }));
    }
  };

  return (
    <section className={styles.modal}>
      {!isModalSubmitted && (
        <form className={styles.form}>
          <h3 className={styles.form__title}>Personal details</h3>
          <InputModal
            value={inputStates.name.value}
            type="text"
            styleType={ModalInputsTypes.name}
            placeholder="Name Surname"
            onChange={(event) =>
              handleChangeValue(event, ModalInputsTypes.name)
            }
            onBlur={(event) => handleBlurValue(event, ModalInputsTypes.name)}
          />
          {inputStates.name.error && (
            <div className={styles.form__error}>
              Name should contain two words more then 3 chars length!
            </div>
          )}
          <InputModal
            value={inputStates.tel.value}
            type="tel"
            styleType={ModalInputsTypes.tel}
            placeholder="Phone number"
            onChange={(event) => handleChangeValue(event, ModalInputsTypes.tel)}
            onBlur={(event) => handleBlurValue(event, ModalInputsTypes.tel)}
          />
          {inputStates.tel.error && (
            <div className={styles.form__error}>
              Phone number should be 9 numbers length and starts with '+'
            </div>
          )}
          <InputModal
            value={inputStates.address.value}
            type="text"
            styleType={ModalInputsTypes.address}
            placeholder="Delivery Address"
            onChange={(event) =>
              handleChangeValue(event, ModalInputsTypes.address)
            }
            onBlur={(event) => handleBlurValue(event, ModalInputsTypes.address)}
          />
          {inputStates.address.error && (
            <div className={styles.form__error}>
              Address should contain three words more then 5 chars length!
            </div>
          )}
          <InputModal
            value={inputStates.email.value}
            type="email"
            styleType={ModalInputsTypes.email}
            placeholder="E-mail"
            onChange={(event) =>
              handleChangeValue(event, ModalInputsTypes.email)
            }
            onBlur={(event) => handleBlurValue(event, ModalInputsTypes.email)}
          />
          {inputStates.email.error && (
            <div className={styles.form__error}>Please enter valid e-mail!</div>
          )}
          <h3 className={styles.form__title}>Credit card details</h3>
          <div className={styles.form__card}>
            <div className={styles.form__cardInputs}>
              <div className={paySystemStyles.join(" ")}></div>
              <InputModal
                value={inputStates.cardNum.value}
                type="text"
                styleType={ModalInputsTypes.cardNum}
                placeholder="Card number"
                onChange={(event) =>
                  handleChangeValue(event, ModalInputsTypes.cardNum)
                }
                onBlur={(event) =>
                  handleBlurValue(event, ModalInputsTypes.cardNum)
                }
              />
              <InputModal
                value={inputStates.cardThru.value}
                type="text"
                styleType={ModalInputsTypes.cardThru}
                placeholder="Card Thru"
                onChange={(event) =>
                  handleChangeValue(event, ModalInputsTypes.cardThru)
                }
                onBlur={(event) =>
                  handleBlurValue(event, ModalInputsTypes.cardThru)
                }
              />
              <InputModal
                value={inputStates.CVV.value}
                type="text"
                styleType={ModalInputsTypes.CVV}
                placeholder="CVV"
                onChange={(event) =>
                  handleChangeValue(event, ModalInputsTypes.CVV)
                }
                onBlur={(event) => handleBlurValue(event, ModalInputsTypes.CVV)}
              />
            </div>
          </div>
          {inputStates.cardNum.error && (
            <div className={styles.form__error}>
              Card number should contain 16 numbers and should not start with
              '0'!
            </div>
          )}
          {inputStates.cardThru.error && (
            <div className={styles.form__error}>
              CardTru should contain month(01-12) and year not yearly 22
            </div>
          )}
          {inputStates.CVV.error && (
            <div className={styles.form__error}>
              CVV should contain 3 numbers
            </div>
          )}
          <Button text={"Confirm"} isActive={false} onClick={submitHandler} />
        </form>
      )}
      {isModalSubmitted && <ModaleSuccessOrder timeLeft={secondsToRedirect} />}
    </section>
  );
};
