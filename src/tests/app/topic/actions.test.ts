import { describe, it, expect, vi, beforeEach } from "vitest"

const mockExecute = vi.fn()
const mockTopics = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  topicUsecase: {
    execute: (...args: Parameters<typeof mockExecute>) => mockExecute(...args),
    topics: (...args: Parameters<typeof mockTopics>) => mockTopics(...args),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { addTopic, topics } from "@/app/topic/actions"

describe("topics", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("UsecaseのTopic一覧を返す", async () => {
    const created_at = new Date()
    const topicList = [{ id: 1, title: "テスト", status: "open", closedAt: null, createdAt: created_at }]
    mockTopics.mockResolvedValue(topicList)

    const result = await topics()

    expect(mockTopics).toHaveBeenCalled()
    expect(result).toEqual(topicList)
  })
})

describe("addTopic", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効なタイトルでUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockExecute.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("title", "今日何回ご飯を食べるか？")

    const result = await addTopic(formData)

    expect(mockExecute).toHaveBeenCalledWith({ title: "今日何回ご飯を食べるか？" })
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockExecute.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("title", "今日何回ご飯を食べるか？")

    await addTopic(formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic")
  })

  it("タイトルが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_title }が返る", async () => {
    const formData = new FormData()

    const result = await addTopic(formData)

    expect(mockExecute).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_title" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockExecute.mockResolvedValue({ ok: false, error: "invalid_title" })
    const formData = new FormData()
    formData.set("title", "")

    const result = await addTopic(formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_title" })
  })
})
