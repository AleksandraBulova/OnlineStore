import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { products } from "../../products"
import { setFilterBrand } from "../../redux/reducers/productsReducer"
import { RootState } from "../../redux/store"
import { FilterContainer } from "../FilterConteiner"
import { Filter } from "../Filter"

import styles from "./styles.module.scss"

export const BrandFilter: FC = () => {
  const { filterBrand, viewProducts } = useSelector((state: RootState) => state.products)

  const dispatch = useDispatch()

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilterBrand({
        checked: event.target.checked,
        brand: event.target.value,
      })
    )
  }

  const brands = products.map((product) => {
    return product.brand
  })

  const uniqueBrands = Array.from(new Set(brands))

  return (
    <FilterContainer title="Brand">
      {uniqueBrands.map((brand) => {
        return (
          <div className={styles.brandFilter} key={brand}>
            <Filter
              key={brand}
              typeOrBrand={brand}
              filterCategory={filterBrand}
              handleChangeCategory={handleChangeCategory}
            />
            <div>
              ({viewProducts.filter((el) => el.brand === brand).length}/
              {products.filter((el) => el.brand === brand).length})
            </div>
          </div>
        )
      })}
    </FilterContainer>
  )
}
