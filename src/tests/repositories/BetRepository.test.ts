import { describe, it, expect, vi, beforeEach } from "vitest"

const mockBetUpsert = vi.fn()
const mockBetFindUnique = vi.fn()
const mockPredictionUpdate = vi.fn()
const mockTransaction = vi.fn()

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: (...args: Parameters<typeof mockTransaction>) => mockTransaction(...args),
    bet: {
      findUnique: (...args: Parameters<typeof mockBetFindUnique>) => mockBetFindUnique(...args),
    },
  },
}))

import { BetRepository } from "@/repositories/BetRepository"

describe("BetRepository", () => {
  const repository = new BetRepository()

  beforeEach(() => {
    vi.clearAllMocks()
    mockTransaction.mockImplementation(
      async (
        fn: (tx: {
          bet: { upsert: typeof mockBetUpsert }
          prediction: { update: typeof mockPredictionUpdate }
        }) => unknown,
      ) =>
        fn({
          bet: { upsert: mockBetUpsert },
          prediction: { update: mockPredictionUpdate },
        }),
    )
  })

  describe("save", () => {
    it("Betをupsertしてpredictionのfk_bet_idを更新しBetModelを返す", async () => {
      const betModel = { id: 1, fk_prediction_id: 1, value: 500 }
      mockBetUpsert.mockResolvedValue(betModel)
      mockPredictionUpdate.mockResolvedValue({})

      const result = await repository.save(1, 500)

      expect(mockBetUpsert).toHaveBeenCalledWith({
        where: { fk_prediction_id: 1 },
        create: { fk_prediction_id: 1, value: 500 },
        update: { value: 500 },
      })
      expect(mockPredictionUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { fk_bet_id: 1 },
      })
      expect(result).toEqual(betModel)
    })
  })

  describe("findByPredictionId", () => {
    it("fk_prediction_idで絞り込んでBetを返す", async () => {
      const betModel = { id: 1, fk_prediction_id: 1, value: 500 }
      mockBetFindUnique.mockResolvedValue(betModel)

      const result = await repository.findByPredictionId(1)

      expect(mockBetFindUnique).toHaveBeenCalledWith({ where: { fk_prediction_id: 1 } })
      expect(result).toEqual(betModel)
    })

    it("Betが存在しない場合はnullを返す", async () => {
      mockBetFindUnique.mockResolvedValue(null)

      const result = await repository.findByPredictionId(1)

      expect(result).toBeNull()
    })
  })
})
