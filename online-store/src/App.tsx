import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Route as RouteType } from "./types";
import styles from "./App.module.scss";
import { MainLayout } from "./layouts/mainLayout";
import { useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store);
  const validRoutes = routes.filter((route) => route.name !== "404");
  const Route404: RouteType = routes.find((route) => route.name === "404")!;
  console.log(store);

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <MainLayout>
          <Routes>
            {validRoutes.map((route) => (
              <Route key={route.id} path={route.path} element={<route.element />} />
            ))}
            <Route path={Route404.path} element={<Route404.element />} />
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
