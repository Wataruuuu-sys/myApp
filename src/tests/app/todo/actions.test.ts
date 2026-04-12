import { describe, it, expect, vi, beforeEach } from "vitest"

const mockAdd = vi.fn()
const mockTodos = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  todoUsecase: {
    add: (...args: Parameters<typeof mockAdd>) => mockAdd(...args),
    todos: (...args: Parameters<typeof mockTodos>) => mockTodos(...args),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { addTodo, todos } from "@/app/todo/actions"

describe("todos", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("UsecaseのTodo一覧を返す", async () => {
    const createdAt = new Date()
    const todoList = [{ id: 1, title: "テスト", createdAt }]
    mockTodos.mockResolvedValue(todoList)

    const result = await todos()

    expect(mockTodos).toHaveBeenCalled()
    expect(result).toEqual(todoList)
  })
})

describe("addTodo", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効なタイトルでUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockAdd.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("title", "牛乳を買う")

    const result = await addTodo(formData)

    expect(mockAdd).toHaveBeenCalledWith("牛乳を買う")
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockAdd.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("title", "牛乳を買う")

    await addTodo(formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/todo")
  })

  it("タイトルが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_title }が返る", async () => {
    const formData = new FormData()

    const result = await addTodo(formData)

    expect(mockAdd).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_title" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockAdd.mockResolvedValue({ ok: false, error: "invalid_title" })
    const formData = new FormData()
    formData.set("title", "")

    const result = await addTodo(formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_title" })
  })
})
