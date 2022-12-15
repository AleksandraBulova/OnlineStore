import { FC } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../components/Product";
import { RootState } from "../../redux/store";

export const MainPage: FC = () => {
  const { viewProducts } = useSelector((state: RootState) => state.products);

  return (
    <>
      <h2>Main page</h2>
      <div>
        {viewProducts.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </>
  );
};
