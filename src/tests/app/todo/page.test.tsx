import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoForm } from "@/app/todo/todo-form";

// Server Action のモック
vi.mock("@/app/todo/actions", () => ({
  addTodo: vi.fn(),
}));

describe("TodoForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("テキスト入力欄と追加ボタンが表示される", () => {
    render(<TodoForm />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });
});
