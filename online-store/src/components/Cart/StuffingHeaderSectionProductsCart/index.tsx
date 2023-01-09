import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  setLimitInputValue,
  setLimitOfProductsPerPage,
} from "../../../redux/reducers/cartReducer";
import { RootState } from "../../../redux/store";
import { getUniqueProducts } from "../../../utils/getUniqueProducts";
import { Button } from "../../UI/Button";

import styles from "./styles.module.scss";

export const StuffingHeaderSectionProductsCart: FC = () => {
  const {
    productsCart,
    limitInputValue,
    limitOfProductsPerPage,
    pageOfProductsCart,
  } = useSelector((state: RootState) => state.cart);

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

  const changeLimitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const limitInputValue = event.target.value;
    if (limitInputValue === "0" || limitInputValue === "") {
      dispatch(setLimitInputValue({ limitInputValue: limitInputValue }));
    } else {
      dispatch(setLimitInputValue({ limitInputValue: limitInputValue }));
      dispatch(
        setLimitOfProductsPerPage({
          limit: Number(limitInputValue),
          page: pageOfProductsCart,
        })
      );
    }
  };

  return (
    <>
      <h2 className={styles.title}>Products In Cart</h2>
      <label className={styles.pageLimit}>
        Limit:
        <input
          className={styles.pageLimit__input}
          type="number"
          min="1"
          max={getUniqueProducts(productsCart).length}
          value={limitInputValue}
          onChange={changeLimitHandler}
        />
      </label>
      <div className={styles.pageNumber}>
        Page:
        <div className={styles.pageNumber__controllers}>
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
