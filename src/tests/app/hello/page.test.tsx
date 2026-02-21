import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HelloPage from "@/app/hello/page";

describe("HelloPage", () => {
  it("「Hello, World!」と表示される", () => {
    render(<HelloPage />);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
