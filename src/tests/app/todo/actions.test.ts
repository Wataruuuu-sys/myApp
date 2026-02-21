import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    todo: {
      create: (...args: Parameters<typeof mockCreate>) => mockCreate(...args),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { addTodo } from "@/app/todo/actions";

describe("addTodo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("テキストを送信するとDBにTODOが作成される", async () => {
    const formData = new FormData();
    formData.set("title", "牛乳を買う");

    await addTodo(formData);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { title: "牛乳を買う" },
    });
  });

  it("空文字を送信してもDBにTODOは作成されない", async () => {
    const formData = new FormData();
    formData.set("title", "");

    await addTodo(formData);

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("空白のみのテキストを送信してもDBにTODOは作成されない", async () => {
    const formData = new FormData();
    formData.set("title", "   ");

    await addTodo(formData);

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("前後の空白がトリムされてDBに保存される", async () => {
    const formData = new FormData();
    formData.set("title", "  牛乳を買う  ");

    await addTodo(formData);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { title: "牛乳を買う" },
    });
  });
});
