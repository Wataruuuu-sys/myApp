import { describe, it, expect, vi, beforeEach } from "vitest"
import { BetUsecase } from "@/usecases/BetUsecase"
import type { IBetRepository } from "@/repositories/IRepository/IBetRepository"
import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"

const mockSave = vi.fn()
const mockFindByPredictionId = vi.fn()
const mockFindById = vi.fn()

const mockBetRepository: IBetRepository = {
  save: mockSave,
  findByPredictionId: mockFindByPredictionId,
}

const mockPredictionRepository: IPredictionRepository = {
  create: vi.fn(),
  update: vi.fn(),
  list: vi.fn(),
  findById: mockFindById,
}

describe("BetUsecase", () => {
  const usecase = new BetUsecase(mockBetRepository, mockPredictionRepository)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("save", () => {
    const validPrediction = {
      id: 1,
      fk_topic_id: 1,
      prediction_type: "number" as const,
      fk_bet_id: null,
      created_at: new Date(),
    }

    it("有効な数値でBetを保存しok: trueを返す", async () => {
      mockFindById.mockResolvedValue(validPrediction)
      mockSave.mockResolvedValue({ id: 1, fk_prediction_id: 1, value: 500 })

      const result = await usecase.save({ predictionId: 1, value: "500" })

      expect(mockFindById).toHaveBeenCalledWith(1)
      expect(mockSave).toHaveBeenCalledWith(1, 500)
      expect(result).toEqual({ ok: true })
    })

    it("数値に変換できない文字列はリポジトリを呼び出さずinvalid_betを返す", async () => {
      const result = await usecase.save({ predictionId: 1, value: "abc" })

      expect(mockFindById).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_bet" })
    })

    it("空文字はinvalid_betを返す", async () => {
      const result = await usecase.save({ predictionId: 1, value: "" })

      expect(mockSave).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_bet" })
    })

    it("存在しないpredictionIdの場合はprediction_not_foundを返す", async () => {
      mockFindById.mockResolvedValue(null)

      const result = await usecase.save({ predictionId: 99, value: "500" })

      expect(mockSave).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "prediction_not_found" })
    })
  })

  describe("findByPredictionId", () => {
    it("Betが存在する場合はBetドメインオブジェクトを返す", async () => {
      mockFindByPredictionId.mockResolvedValue({ id: 1, fk_prediction_id: 1, value: 500 })

      const result = await usecase.findByPredictionId(1)

      expect(mockFindByPredictionId).toHaveBeenCalledWith(1)
      expect(result).not.toBeNull()
      expect(result?.id).toBe(1)
      expect(result?.predictionId).toBe(1)
      expect(result?.value).toBe(500)
    })

    it("Betが存在しない場合はnullを返す", async () => {
      mockFindByPredictionId.mockResolvedValue(null)

      const result = await usecase.findByPredictionId(1)

      expect(result).toBeNull()
    })
  })
})
