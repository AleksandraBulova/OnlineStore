import { FC, FocusEvent, useState } from "react";
import { InputModal } from "../InputModal";
import { Button } from "../../UI/Button";

import styles from "./styles.module.scss";

export const ModalCheckoutWindow: FC = () => {
  const [inputStates, setInputStates] = useState({
    name: { value: "", error: false },
    tel: { value: "", error: false },
    address: { value: "", error: false },
    email: { value: "", error: false },
    card: { value: "", error: false },
  });

  console.log(inputStates);

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const eventTarget = event.target;

    switch (type) {
      case "name":
        setInputStates((prev) => ({
          ...prev,
          name: { ...prev.name, value: eventTarget.value },
        }));
        return;
      case "tel":
        setInputStates((prev) => ({
          ...prev,
          tel: { ...prev.tel, value: eventTarget.value },
        }));
        return;
      case "address":
        setInputStates((prev) => ({
          ...prev,
          address: { ...prev.address, value: eventTarget.value },
        }));
        return;
      case "email":
        setInputStates((prev) => ({
          ...prev,
          email: { ...prev.email, value: eventTarget.value },
        }));
        return;
      case "card":
        setInputStates((prev) => {
          const currentCaretePosition = eventTarget.selectionStart!;
          eventTarget.value = eventTarget.value.replace(/[^0-9]/g, "");
          if (eventTarget.value.length > 16)
            eventTarget.value = eventTarget.value.substring(0, 16);
          let template = "XXXX XXXX XXXX XXXX";
          const numbersArr = eventTarget.value.split("");
          numbersArr.forEach((number) => (template = template.replace(/X/, number)));
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

          return {
            ...prev,
            card: {
              ...prev.card,
              value: eventTarget.value,
            },
          };
        });
        return;
    }
  };

  const handleBlurValue = (event: FocusEvent<HTMLInputElement>, type: string): void => {
    const eventTarget = event.target;
    const valueArray = eventTarget.value.split(" ");
    const valueArrayForTel = eventTarget.value.split("");
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    switch (type) {
      case "name":
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
              name: { ...prev.name, error: false },
            }));
            return;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          name: { ...prev.name, error: true },
        }));
        return;
      case "tel":
        if (valueArrayForTel.length >= 10 && valueArrayForTel[0] === "+") {
          const check = valueArrayForTel.slice(+valueArrayForTel[1]).map((item) => {
            return item < "0" || item > "9" ? false : true;
          });
          if (check.every((elem) => elem)) {
            setInputStates((prev) => ({
              ...prev,
              tel: { ...prev.tel, error: false },
            }));
            return;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          tel: { ...prev.tel, error: true },
        }));
        return;
      case "address":
        if (valueArray.length >= 3) {
          if (
            valueArray[0].length >= 5 &&
            valueArray[1].length >= 5 &&
            valueArray[2].length >= 5
          ) {
            setInputStates((prev) => ({
              ...prev,
              address: { ...prev.address, error: false },
            }));
            return;
          }
        }
        setInputStates((prev) => ({
          ...prev,
          address: { ...prev.address, error: true },
        }));
        return;
      case "email":
        if (EMAIL_REGEXP.test(eventTarget.value)) {
          setInputStates((prev) => ({
            ...prev,
            email: { ...prev.email, error: false },
          }));
          return;
        }
        setInputStates((prev) => ({
          ...prev,
          email: { ...prev.email, error: true },
        }));
        return;
      case "card":
        if (
          !"456".includes(eventTarget.value[0]) ||
          eventTarget.value.replace(/[^0-9]/g, "").length < 16
        ) {
          setInputStates((prev) => ({
            ...prev,
            card: { ...prev.card, error: true },
          }));
          return;
        }

        setInputStates((prev) => ({
          ...prev,
          card: { ...prev.card, error: false },
        }));
        return;
    }
  };

  return (
    <div className={styles.backDrop}>
      <section className={styles.modal}>
        <form className={styles.form}>
          <h3 className={styles.form__title}>Personal details</h3>
          <InputModal
            value={inputStates.name.value}
            type="text"
            styleType="personal"
            placeholder="Name Surname"
            onChange={(event) => handleChangeValue(event, "name")}
            onBlur={(event) => handleBlurValue(event, "name")}
          />
          {inputStates.name.error && <div className={styles.form__error}>Error!</div>}
          <InputModal
            value={inputStates.tel.value}
            type="tel"
            styleType="personal"
            placeholder="Phone number"
            onChange={(event) => handleChangeValue(event, "tel")}
            onBlur={(event) => handleBlurValue(event, "tel")}
          />
          {inputStates.tel.error && <div className={styles.form__error}>Error!</div>}
          <InputModal
            value={inputStates.address.value}
            type="text"
            styleType="personal"
            placeholder="Delivery Address"
            onChange={(event) => handleChangeValue(event, "address")}
            onBlur={(event) => handleBlurValue(event, "address")}
          />
          {inputStates.address.error && <div className={styles.form__error}>Error!</div>}
          <InputModal
            value={inputStates.email.value}
            type="email"
            styleType="personal"
            placeholder="E-mail"
            onChange={(event) => handleChangeValue(event, "email")}
            onBlur={(event) => handleBlurValue(event, "email")}
          />
          {inputStates.email.error && <div className={styles.form__error}>Error!</div>}
          <h3 className={styles.form__title}>Credit card details</h3>
          <div className={styles.form__card}>
            <div className={styles.form__cardInputs}>
              <InputModal
                value={inputStates.card.value}
                type="text"
                styleType="cardNumber"
                placeholder="Card number"
                onChange={(event) => handleChangeValue(event, "card")}
                onBlur={(event) => handleBlurValue(event, "card")}
              />
            </div>
          </div>
          {inputStates.card.error && (
            <div className={styles.form__error}>
              Card number should contain 16 numbers and start with '4', '5' or '6'
            </div>
          )}
          <Button text={"Confirm"} isActive={false} onClick={(event) => alert(event)} />
        </form>
      </section>
    </div>
  );
};
