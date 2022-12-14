import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Link } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/mainLayout";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          {routes.map((route) => (
            <li>
              <Link key={route.id} to={route.path}>
                {route.name}
              </Link>
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
