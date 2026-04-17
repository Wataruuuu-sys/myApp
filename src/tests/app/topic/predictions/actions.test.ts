import { describe, it, expect, vi, beforeEach } from "vitest"

const mockCreate = vi.fn()
const mockUpdate = vi.fn()
const mockList = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  predictionUsecase: {
    create: (...args: Parameters<typeof mockCreate>) => mockCreate(...args),
    update: (...args: Parameters<typeof mockUpdate>) => mockUpdate(...args),
    list: (...args: Parameters<typeof mockList>) => mockList(...args),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { createPrediction, updatePrediction, predictions } from "@/app/topic/[id]/predictions/actions"

describe("createPrediction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効な数値でUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockCreate.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "42")

    const result = await createPrediction(1, formData)

    expect(mockCreate).toHaveBeenCalledWith({ topicId: 1, predict: "42" })
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockCreate.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "42")

    await createPrediction(1, formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic/1")
  })

  it("predictが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_prediction }が返る", async () => {
    const formData = new FormData()

    const result = await createPrediction(1, formData)

    expect(mockCreate).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_prediction" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockCreate.mockResolvedValue({ ok: false, error: "topic_not_open" })
    const formData = new FormData()
    formData.set("predict", "42")

    const result = await createPrediction(1, formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "topic_not_open" })
  })
})

describe("updatePrediction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効な数値でUsecaseが呼び出され{ ok: true }が返る", async () => {
    mockUpdate.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "99")

    const result = await updatePrediction(10, 1, formData)

    expect(mockUpdate).toHaveBeenCalledWith({ predictionId: 10, predict: "99" })
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockUpdate.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("predict", "99")

    await updatePrediction(10, 1, formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic/1")
  })

  it("predictが文字列でない場合はUsecaseを呼び出さず{ ok: false, error: invalid_prediction }が返る", async () => {
    const formData = new FormData()

    const result = await updatePrediction(10, 1, formData)

    expect(mockUpdate).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_prediction" })
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
