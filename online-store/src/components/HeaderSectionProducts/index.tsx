import { FC } from "react";
import { products } from "../../products";

export const HeaderSectionProducts: FC = () => {
  return (
    <header>
      <select name="sort">
        <option value="sort1">Sort Product 1</option>
        <option value="sort2">Sort Product 2</option>
        <option value="sort3">Sort Product 3</option>
      </select>
      <div>Found: {products.length}</div>
      <input type="text" placeholder="Search product" />
    </header>
  );
};
