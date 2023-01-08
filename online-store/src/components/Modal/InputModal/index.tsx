import { FC, FocusEvent } from "react";
import { ModalInputsTypes } from "../../../types";

import styles from "./styles.module.scss";

interface Props {
  type: string;
  styleType: ModalInputsTypes;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputModal: FC<Props> = ({
  type,
  styleType,
  placeholder,
  onChange,
  onBlur,
  value,
}) => {
  const inputStyle = [styles.input];

  switch (styleType) {
    case ModalInputsTypes.cardNum:
      inputStyle.push(styles.input_cardNumber);
      break;

    case ModalInputsTypes.cardThru:
      inputStyle.push(styles.input_cardThru);
      break;

    case ModalInputsTypes.CVV:
      inputStyle.push(styles.input_CVV);
      break;
    default:
      inputStyle.push(styles.input_personal);
      break;
  }

  return (
    <input
      className={inputStyle.join(" ")}
      type={type}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
