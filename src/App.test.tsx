import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
// NEXT: get toHaveTextContent typing to work
// looking at using @types/jest vs @jest/globals
// maybe @types/jest is from Definitelytyped and @jest/globals
// with https://dev.to/kengotoda/how-to-replace-types-jest-with-jest-globals-and-jest-mock-52mb
// ok @jest/globals did not work - same error, different library
// now going to try @jest/expect

// import App from "./App.tsx";
import TestComponent from "./TestComponent";

test("loads and displays a loading button", async () => {
  // ARRANGE
  render(<TestComponent />);

  //   // ACT
  //   // await userEvent.click(screen.getByText("Load Greeting"));
  //   // await screen.findByRole("heading");

  //   // ASSERT
  expect(screen.getByRole("h1")).toHaveTextContent(
    "this is the test component"
  );
  //   // expect(screen.getByRole("button")).toBeDisabled();
});

test("start experiment test", () => {
  expect(true).toEqual(true);
});

console.log("true!");
