import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { IProduct } from "../../types"

import styles from "./styles.module.scss"

interface IProductCardProps {
  product: IProduct
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.product}>
      <div
        className={styles.product__info}
        onClick={() => navigate(`/product/${product.id}`)}
      >
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
      </div>
      <div>
        <button>Details</button>
        <button>Add to cart</button>
      </div>
    </div>
  )
}
