import { FC } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ProductCard } from "../../components/ProductCard"
import { RootState } from "../../redux/store"
import { IProduct } from "../../types"

export const ProductPage: FC = () => {
  const { id } = useParams()
  const products = useSelector((state: RootState) => state.products.products)

  return (
    <>
      <h2>Product page</h2>
      <ProductCard
        product={products.find((product) => product.id === Number(id)) as IProduct}
        view="gorizontal"
      />
    </>
  )
}
