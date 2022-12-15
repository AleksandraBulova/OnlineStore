import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Link } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/mainLayout";
import { useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store);
  console.log(store);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
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
    </BrowserRouter>
  );
}

export default App;
