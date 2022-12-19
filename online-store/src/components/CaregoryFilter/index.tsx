import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory } from "../../redux/reducers/productsReducer";
import { RootState } from "../../redux/store";

export const CaregoryFilter: FC = () => {
  const { wine, whiskey, cognac, vodka } = useSelector(
    (state: RootState) => state.products.filterCategory
  );
  const dispatch = useDispatch();

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilterCategory({
        checked: event.target.checked,
        category: event.target.value,
      })
    );
  };

  return (
    <div>
      <h2>Category</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={wine}
            value="wine"
            onChange={handleChangeCategory}
          />
          Wine
        </label>
        <label>
          <input
            type="checkbox"
            checked={whiskey}
            value="whiskey"
            onChange={handleChangeCategory}
          />
          Whiskey
        </label>
        <label>
          <input
            type="checkbox"
            checked={cognac}
            value="cognac"
            onChange={handleChangeCategory}
          />
          Cognac
        </label>
        <label>
          <input
            type="checkbox"
            checked={vodka}
            value="vodka"
            onChange={handleChangeCategory}
          />
          Vodka
        </label>
      </div>
    </div>
  );
};
