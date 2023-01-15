import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Render main layouts for pages", () => {
  test("Header render correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // window.location.pathname = "/";
    const logoElement = screen.getByRole("link", { name: /online store/i });
    const cartSum = screen.getByText(/Cart total/i);
    const cart = screen.getByRole("link", { name: /Cart/i });
    expect(logoElement).toBeInTheDocument();
    expect(cartSum).toBeInTheDocument();
    expect(cart).toBeInTheDocument();
  });

  test("Main layout renders correct", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(window.location.pathname).toBe("/");
    expect(screen.queryByTestId("mainPage-content")).toBeInTheDocument();

    userEvent.click(screen.getByRole("link", { name: /Cart/i }));
    expect(window.location.pathname).toBe("/cart");
    expect(screen.queryByTestId("cartPage-content")).toBeInTheDocument();

    userEvent.click(screen.getByRole("link", { name: /online store/i }));
    expect(window.location.pathname).toBe("/");

    userEvent.click(screen.getByRole("heading", { name: /nikka days/i }));
    expect(window.location.pathname).toBe("/product/40/Nikka%20Days");
    expect(screen.queryByTestId("productPage-content")).toBeInTheDocument();
  });
});
