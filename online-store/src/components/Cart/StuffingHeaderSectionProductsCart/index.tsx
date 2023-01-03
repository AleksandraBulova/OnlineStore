import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  setLimitOfProductsPerPage,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { getUniqueProducts } from "../../../utils/getUniqueProducts";
import { Button } from "../../UI/Button";

export const StuffingHeaderSectionProductsCart: FC = () => {
  const { productsCart, limitOfProductsPerPage, pageOfProductsCart } =
    useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const changePageHandler = (type: "plus" | "minus") => {
    if (
      type === "plus" &&
      pageOfProductsCart !==
        Math.ceil(
          getUniqueProducts(productsCart).length / limitOfProductsPerPage
        )
    ) {
      dispatch(changePage(pageOfProductsCart + 1));
    }
    if (type === "minus" && pageOfProductsCart !== 1) {
      dispatch(changePage(pageOfProductsCart - 1));
    }
  };

  return (
    <>
      <h2>Products In Cart</h2>
      <label>
        Limit:
        <input
          type="number"
          min="1"
          max={getUniqueProducts(productsCart).length}
          value={limitOfProductsPerPage}
          onChange={(event) =>
            dispatch(
              setLimitOfProductsPerPage({
                limit: Number(event.target.value),
                page: pageOfProductsCart,
              })
            )
          }
        />
      </label>
      <div>
        PAGE:
        <div>
          <Button
            text="<"
            isActive={false}
            onClick={() => changePageHandler("minus")}
          />
          <div>
            {pageOfProductsCart}/
            {Math.ceil(
              getUniqueProducts(productsCart).length / limitOfProductsPerPage
            )}
          </div>
          <Button
            text=">"
            isActive={false}
            onClick={() => changePageHandler("plus")}
          />
        </div>
      </div>
    </>
  );
};
