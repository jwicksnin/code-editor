import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TestComponent from "./TestComponent";

test("loads and displays a loading button", async () => {
  render(<TestComponent />);
  expect(screen.getByRole("heading")).toHaveTextContent(
    "this is the test component"
  );
});

test("start experiment test", () => {
  expect(true).toEqual(true);
});
