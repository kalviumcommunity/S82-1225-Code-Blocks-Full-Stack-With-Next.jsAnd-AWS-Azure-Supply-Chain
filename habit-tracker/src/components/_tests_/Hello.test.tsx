import { render, screen } from "@testing-library/react";
import Hello from "../Hello";

describe("Hello component", () => {
  it("renders the correct greeting", () => {
    render(<Hello name="Kalvium" />);

    expect(
      screen.getByText("Hello, Kalvium")
    ).toBeInTheDocument();
  });
});
