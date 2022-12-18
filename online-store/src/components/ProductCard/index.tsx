import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { IProduct } from "../../types"
import { Button } from "../UI/Button"

import styles from "./styles.module.scss"

interface IProductCardProps {
  product: IProduct
  view?: "vertical" | "gorizontal"
}

export const ProductCard: FC<IProductCardProps> = ({ product, view = "vertical" }) => {
  const navigate = useNavigate()
  const viewStyle = {
    vertical: styles.product_vertical,
    gorizontal: styles.product_gorizontal,
  }
  const productStyle = [styles.product, viewStyle[view]].join(" ")

  return (
    <div className={productStyle} onClick={() => navigate(`/product/${product.id}`)}>
      <div className={styles.img}>
        <div className={styles.img__pagination_left}></div>
        <div className={styles.img__pagination_right}></div>
        <div className={styles.img__itemWrapper}>
          {product.photo.map((photo) => {
            return (
              <div
                className={styles.img__item}
                style={{ backgroundImage: `url(${photo})` }}
              />
            )
          })}
        </div>
        <div className={styles.img__bullets}>
          <span className={styles.img__bullets__item}></span>
          <span className={styles.img__bullets__item}></span>
        </div>
      </div>
      <h3 className={styles.product__name}>{product.name}</h3>
      <ul className={styles.info}>
        <li className={styles.info__brand}>{product.brand}</li>
        <li className={styles.info__description}>{product.description}</li>
        <li className={styles.info__category}> {product.type}</li>
        <li className={styles.info__stock}>Stock: {product.stock}</li>
        <li className={styles.info__price}>{`${product.price} $`}</li>
      </ul>
      <Button text="Add to cart" isActive={false} />
    </div>
  )
}
