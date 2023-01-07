import { FC, FocusEvent } from "react";

import styles from "./styles.module.scss";

interface Props {
  type: string;
  styleType: "personal" | "cardNumber";
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
    case "personal":
      inputStyle.push(styles.input_personal);
      break;

    case "cardNumber":
      inputStyle.push(styles.input_cardNumber);
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
