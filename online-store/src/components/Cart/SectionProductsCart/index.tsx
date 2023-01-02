import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProductCart } from "../ProductCart";
import { HeaderSection } from "../../UI/HeaderSection";
import { StuffingHeaderSectionProductsCart } from "../StuffingHeaderSectionProductsCart";

export const SectionProductsCart: FC = () => {
  const { productsCart } = useSelector((state: RootState) => state.cart);
  const uniqueProductsCart = Array.from(new Set(productsCart));
  console.log(productsCart);

  return (
    <section>
      <HeaderSection>
        <StuffingHeaderSectionProductsCart />
      </HeaderSection>
      {uniqueProductsCart.map((product, index) => {
        return <ProductCart key={index} product={product} index={index} />;
      })}
    </section>
  );
};
