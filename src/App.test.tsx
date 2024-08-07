import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App.tsx";

test("loads and displays a loading button", async () => {
  // ARRANGE
  render(<App />);

  // ACT
  // await userEvent.click(screen.getByText("Load Greeting"));
  // await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("button")).toHaveTextContent("Submit");
  // expect(screen.getByRole("button")).toBeDisabled();
});
