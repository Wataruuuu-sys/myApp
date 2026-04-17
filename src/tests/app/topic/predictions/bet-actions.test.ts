import { describe, it, expect, vi, beforeEach } from "vitest"

const mockSave = vi.fn()
const mockRevalidatePath = vi.fn()

vi.mock("@/lib/container", () => ({
  predictionUsecase: {
    execute: vi.fn(),
    list: vi.fn(),
  },
  betUsecase: {
    save: (...args: Parameters<typeof mockSave>) => mockSave(...args),
    findByPredictionId: vi.fn(),
  },
}))

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { saveBet } from "@/app/topic/[id]/predictions/actions"

describe("saveBet", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("有効な数値でUsecaseが呼び出されok: trueが返る", async () => {
    mockSave.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("value", "500")

    const result = await saveBet(1, 1, formData)

    expect(mockSave).toHaveBeenCalledWith({ predictionId: 1, value: "500" })
    expect(result).toEqual({ ok: true })
  })

  it("成功時にrevalidatePathが呼び出される", async () => {
    mockSave.mockResolvedValue({ ok: true })
    const formData = new FormData()
    formData.set("value", "500")

    await saveBet(1, 1, formData)

    expect(mockRevalidatePath).toHaveBeenCalledWith("/topic/1")
  })

  it("valueが文字列でない場合はUsecaseを呼び出さずinvalid_betが返る", async () => {
    const formData = new FormData()

    const result = await saveBet(1, 1, formData)

    expect(mockSave).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "invalid_bet" })
  })

  it("Usecaseがok: falseを返す場合はrevalidatePathは呼び出されない", async () => {
    mockSave.mockResolvedValue({ ok: false, error: "prediction_not_found" })
    const formData = new FormData()
    formData.set("value", "500")

    const result = await saveBet(1, 1, formData)

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "prediction_not_found" })
  })
})
