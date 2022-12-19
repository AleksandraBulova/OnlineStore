import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../../products";
import { setFilterBrand } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";

export const BrandFilter: FC = () => {
  const brandsFilter = useSelector(
    (state: RootState) => state.products.filterBrand
  );

  const dispatch = useDispatch();

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilterBrand({
        checked: event.target.checked,
        brand: event.target.value,
      })
    );
  };

  const brands = products.map((product) => {
    return product.brand
      .split(" ")
      .join("")
      .split("'")
      .join("")
      .split("-")
      .join("")
      .split(".")
      .join("");
  });

  const uniqueBrands = Array.from(new Set(brands));

  return (
    <div>
      <h2>Brand</h2>
      <div>
        {uniqueBrands.map((brand, i) => {
          return (
            <label key={brand}>
              <input
                type="checkbox"
                checked={brandsFilter[brand]}
                value={brand}
                onChange={handleChangeCategory}
              />
              {brand}
            </label>
          );
        })}
      </div>
    </div>
  );
};
