import { FC } from "react";
import { useSelector } from "react-redux";
import { Product } from "../Product";
import { RootState } from "../../redux/store";
import { HeaderSectionProducts } from "../HeaderSectionProducts";

export const SectionProducts: FC = () => {
  const { viewProducts } = useSelector((state: RootState) => state.products);

  return (
    <section>
      <HeaderSectionProducts />
      <div>
        {viewProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
