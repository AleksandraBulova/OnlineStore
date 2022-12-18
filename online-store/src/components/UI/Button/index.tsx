import { FC } from "react"

import styles from "./styles.module.scss"

interface IButton {
  text: string
  isActive: boolean
}

export const Button: FC<IButton> = ({ text, isActive }) => {
  const style: Array<string> = [styles.btn]
  const addToCard = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    alert("TODO: Реализовать добавление хедлера на кнопку в зависимости от ее типа")
  }

  if (isActive) style.push(styles.active)

  return (
    <button className={style.join(" ")} onClick={addToCard}>
      {text}
    </button>
  )
}
