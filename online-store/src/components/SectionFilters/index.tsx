import { FC } from "react";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../redux/reducers/productsReducer";
import { CaregoryFilter } from "../CaregoryFilter";

export const SectionFilters: FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(resetFilter())}>Reset Filters</button>
      <CaregoryFilter />
    </>
  );
};
