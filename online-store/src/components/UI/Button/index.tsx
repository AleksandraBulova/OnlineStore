import { FC } from "react"

import styles from "./styles.module.scss"

interface IButton {
  text: string
  isActive: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<IButton> = ({ text, isActive, onClick }) => {
  const style: Array<string> = [styles.btn]

  if (isActive) style.push(styles.active)

  return (
    <button className={style.join(" ")} onClick={onClick}>
      {text}
    </button>
  )
}
