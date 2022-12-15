import { FC } from "react";
import { IProduct } from "../../types";

interface IProductProps {
  product: IProduct;
}

export const Product: FC<IProductProps> = ({ product }) => {
  return (
    <div>
      <div>
        <h2>{product.name}</h2>
        <div>
          <img src={product.photo[0]} alt="prosuct" />
          <ul>
            <li>Brand: {product.brand}</li>
            <li>Description: {product.description}</li>
            <li>Price: {product.price}$</li>
            <li>Stock: {product.stock}</li>
          </ul>
        </div>
      </div>
      <div>
        <button>Details</button>
        <button>Add to cart</button>
      </div>
    </div>
  );
};
