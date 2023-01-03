import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Link } from "react-router-dom";
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
        {/* <nav>
          <ul>
            {routes.map((route) => (
              <li key={route.id}>
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </nav> */}
        <MainLayout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
