import { FC, FocusEvent, useState } from "react";
import { InputModal } from "../InputModal";

export const ModalCheckoutWindow: FC = () => {
  const [inputStates, setInputStates] = useState({
    name: { value: "", error: false },
    tel: { value: "", error: false },
    address: { value: "", error: false },
    email: { value: "", error: false },
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
    }
  };

  const handleBlurValue = (
    event: FocusEvent<HTMLInputElement>,
    type: string
  ): void => {
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
          const check = valueArrayForTel
            .slice(+valueArrayForTel[1])
            .map((item) => {
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
    }
  };

  return (
    <section>
      <h3>Personal details</h3>
      <form>
        <InputModal
          value={inputStates.name.value}
          type="text"
          placeholder="Name Surname"
          onChange={(event) => handleChangeValue(event, "name")}
          onBlur={(event) => handleBlurValue(event, "name")}
        />
        {inputStates.name.error && <div style={{ color: "red" }}>Error!</div>}
        <InputModal
          value={inputStates.tel.value}
          type="tel"
          placeholder="Phone number"
          onChange={(event) => handleChangeValue(event, "tel")}
          onBlur={(event) => handleBlurValue(event, "tel")}
        />
        {inputStates.tel.error && <div style={{ color: "red" }}>Error!</div>}
        <InputModal
          value={inputStates.address.value}
          type="text"
          placeholder="Delivery Address"
          onChange={(event) => handleChangeValue(event, "address")}
          onBlur={(event) => handleBlurValue(event, "address")}
        />
        {inputStates.address.error && (
          <div style={{ color: "red" }}>Error!</div>
        )}
        <InputModal
          value={inputStates.email.value}
          type="email"
          placeholder="E-mail"
          onChange={(event) => handleChangeValue(event, "email")}
          onBlur={(event) => handleBlurValue(event, "email")}
        />
        {inputStates.email.error && <div style={{ color: "red" }}>Error!</div>}
      </form>
      <input type="submit" value="Confirm" />
    </section>
  );
};
