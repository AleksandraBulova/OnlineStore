import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h3>{product.name}</h3>
        <div>
          <img
            onClick={() => navigate(`/product/${product.id}`)}
            src={product.photo[0]}
            alt="prosuct"
          />
          <ul>
            <li>Brand: {product.brand}</li>
            <li>Category: {product.type}</li>
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
