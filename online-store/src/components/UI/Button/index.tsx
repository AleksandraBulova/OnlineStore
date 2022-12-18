import { FC } from "react"

import styles from "./styles.module.scss"

interface IButton {
  text: string
  isActive: boolean
}

export const Button: FC<IButton> = ({ text, isActive }) => {
  const style: Array<string> = [styles.btn]
  if (isActive) style.push(styles.active)

  return <button className={style.join(" ")}>{text}</button>
}
