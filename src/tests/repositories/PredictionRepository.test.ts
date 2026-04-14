import { describe, it, expect, vi, beforeEach } from "vitest"

const mockPredictionCreate = vi.fn()
const mockPredictionNumberCreate = vi.fn()
const mockPredictionFindMany = vi.fn()
const mockTransaction = vi.fn()

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: (...args: Parameters<typeof mockTransaction>) => mockTransaction(...args),
    prediction: {
      findMany: (...args: Parameters<typeof mockPredictionFindMany>) => mockPredictionFindMany(...args),
    },
  },
}))

import { PredictionRepository } from "@/repositories/PredictionRepository"

describe("PredictionRepository", () => {
  const repository = new PredictionRepository()

  beforeEach(() => {
    vi.clearAllMocks()
    mockTransaction.mockImplementation(async (fn: (tx: {
      prediction: { create: typeof mockPredictionCreate },
      predictionNumber: { create: typeof mockPredictionNumberCreate },
    }) => unknown) =>
      fn({
        prediction: { create: mockPredictionCreate },
        predictionNumber: { create: mockPredictionNumberCreate },
      })
    )
  })

  describe("submit", () => {
    it("Prediction・PredictionNumberを正しいクエリ引数でトランザクション内に作成しPredictionModelを返す", async () => {
      const predictionModel = { id: 1, fk_topic_id: 1, prediction_type: "number", created_at: new Date() }
      mockPredictionCreate.mockResolvedValue(predictionModel)
      mockPredictionNumberCreate.mockResolvedValue({})

      const result = await repository.submit(1, 42)

      expect(mockPredictionCreate).toHaveBeenCalledWith({
        data: { fk_topic_id: 1, prediction_type: "number" },
      })
      expect(mockPredictionNumberCreate).toHaveBeenCalledWith({
        data: { fk_prediction_id: 1, predict: 42 },
      })
      expect(result).toEqual(predictionModel)
    })
  })

  describe("list", () => {
    it("topicIdで絞り込んでPrediction一覧をnumbersとともに返す", async () => {
      const now = new Date()
      const records = [
        { id: 1, fk_topic_id: 1, prediction_type: "number", created_at: now, numbers: [{ predict: 42 }] },
      ]
      mockPredictionFindMany.mockResolvedValue(records)

      const result = await repository.list(1)

      expect(mockPredictionFindMany).toHaveBeenCalledWith({
        where: { fk_topic_id: 1 },
        include: { numbers: { select: { predict: true } } },
      })
      expect(result).toEqual(records)
    })

    it("予想がない場合は空配列を返す", async () => {
      mockPredictionFindMany.mockResolvedValue([])

      const result = await repository.list(1)

      expect(result).toEqual([])
    })
  })
})
