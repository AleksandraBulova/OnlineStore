import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import styles from "./App.module.scss";
import { MainLayout } from "./layouts/mainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateFilters } from "./redux/reducers/productsReducer";

function App() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log(store);

  useEffect(() => {
    dispatch(updateFilters());
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <MainLayout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.element />}
              />
            ))}
            {/* TODO: create NotFound Component and add to route below */}
            <Route
              path="*"
              element={<h1>Here should be NotFound component!!!</h1>}
            />
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
