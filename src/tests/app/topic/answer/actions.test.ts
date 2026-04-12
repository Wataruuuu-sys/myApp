import { describe, it, expect, vi, beforeEach } from "vitest"

const mockSubmit = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  answerUsecase: {
    submit: (...args: Parameters<typeof mockSubmit>) => mockSubmit(...args),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { submitAnswer } from "@/app/topic/[id]/answer/actions"

describe("submitAnswer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効な数値でUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockSubmit.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("answer", "42")

    const result = await submitAnswer(1, formData)

    expect(mockSubmit).toHaveBeenCalledWith(1, "42")
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockSubmit.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("answer", "42")

    await submitAnswer(1, formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic")
  })

  it("answerが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_answer }が返る", async () => {
    const formData = new FormData()

    const result = await submitAnswer(1, formData)

    expect(mockSubmit).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_answer" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockSubmit.mockResolvedValue({ ok: false, error: "already_answered" })
    const formData = new FormData()
    formData.set("answer", "42")

    const result = await submitAnswer(1, formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "already_answered" })
  })
})
