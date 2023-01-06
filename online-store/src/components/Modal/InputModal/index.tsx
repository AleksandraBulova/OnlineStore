import { FC, FocusEvent } from "react";

interface Props {
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputModal: FC<Props> = ({
  type,
  placeholder,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
