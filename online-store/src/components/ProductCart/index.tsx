import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { IProduct } from "../../types";
import { Button } from "../UI/Button";

import styles from "./styles.module.scss";

interface IProductCardProps {
  product: IProduct;
  index: number;
}

export const ProductCart: FC<IProductCardProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const { productsCart } = useSelector((state: RootState) => state.products);
  return (
    <div onClick={() => navigate(`/product/${product.id}`)}>
      <div>{index + 1}</div>
      <div>
        <img src={product.photo[0]} alt="product" />
        <div>
          <h3>{product.name}</h3>
          <h5>{product.brand}</h5>
          <p>{product.description}</p>
        </div>
        <div>
          <div>Stock: {product.stock}</div>
          <div>
            <Button
              text="-"
              isActive={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                event.stopPropagation()
              }
            />
            <div>
              {productsCart.filter((item) => item.id === product.id).length}
            </div>
            <Button
              text="+"
              isActive={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                event.stopPropagation()
              }
            />
          </div>
          <div>{`$${product.price}`}</div>
        </div>
      </div>
    </div>
  );
};
