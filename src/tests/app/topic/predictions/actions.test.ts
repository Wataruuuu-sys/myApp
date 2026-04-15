import { describe, it, expect, vi, beforeEach } from "vitest"

const mockExecute = vi.fn()
const mockList = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  predictionUsecase: {
    execute: (...args: Parameters<typeof mockExecute>) => mockExecute(...args),
    list: (...args: Parameters<typeof mockList>) => mockList(...args),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { submitPrediction, predictions } from "@/app/topic/[id]/predictions/actions"

describe("submitPrediction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効な数値でUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockExecute.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "42")

    const result = await submitPrediction(1, formData)

    expect(mockExecute).toHaveBeenCalledWith({ topicId: 1, predict: "42" })
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockExecute.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "42")

    await submitPrediction(1, formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic/1")
  })

  it("predictが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_prediction }が返る", async () => {
    const formData = new FormData()

    const result = await submitPrediction(1, formData)

    expect(mockExecute).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_prediction" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockExecute.mockResolvedValue({ ok: false, error: "topic_not_open" })
    const formData = new FormData()
    formData.set("predict", "42")

    const result = await submitPrediction(1, formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "topic_not_open" })
  })
})

describe("predictions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("Usecaseの予想一覧を返す", async () => {
    const now = new Date()
    const predictionList = [{ id: 1, topicId: 1, createdAt: now, predict: 42 }]
    mockList.mockResolvedValue(predictionList)

    const result = await predictions(1)

    expect(mockList).toHaveBeenCalledWith(1)
    expect(result).toEqual(predictionList)
  })
})
