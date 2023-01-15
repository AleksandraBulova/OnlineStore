import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Add to cart tests", () => {
  test("Header products in cart shown correct", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const firstProductCard = screen.getByTestId(1);
    const firstProductButton = firstProductCard.childNodes[3] as Element;

    const secondProductCard = screen.getByTestId(2);
    const secondProductButton = secondProductCard.childNodes[3] as Element;

    userEvent.click(firstProductButton);
    expect(screen.getByRole("link", { name: /cart:/i })).toHaveTextContent(/1/i);
    expect(screen.getByText(/Cart total:/i)).toHaveTextContent(/50/i);

    userEvent.click(secondProductButton);
    expect(screen.getByRole("link", { name: /cart:/i })).toHaveTextContent(/2/i);
    expect(screen.getByText(/Cart total:/i)).toHaveTextContent(/115/i);

    userEvent.click(screen.getAllByRole("button", { name: /drop from cart/i })[0]);
    expect(screen.getByRole("link", { name: /cart:/i })).toHaveTextContent(/1/i);
    expect(screen.getByText(/Cart total:/i)).toHaveTextContent(/65/i);

    userEvent.click(screen.getAllByRole("button", { name: /drop from cart/i })[0]);
    expect(screen.getByRole("link", { name: /cart:/i })).toHaveTextContent(/0/i);
    expect(screen.getByText(/Cart total:/i)).toHaveTextContent(/0/i);
  });
});
