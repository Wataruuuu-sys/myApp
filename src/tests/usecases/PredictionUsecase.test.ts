import { describe, it, expect, vi, beforeEach } from "vitest"
import { PredictionUsecase } from "@/usecases/PredictionUsecase"
import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"

const mockSubmit = vi.fn()
const mockList = vi.fn()
const mockFind = vi.fn()

const mockPredictionRepository: IPredictionRepository = {
  submit: mockSubmit,
  list: mockList,
  findById: vi.fn(),
}

const mockTopicRepository: ITopicRepository = {
  create: vi.fn(),
  all: vi.fn(),
  find: mockFind,
  markAnswered: vi.fn(),
}

describe("PredictionUsecase", () => {
  const usecase = new PredictionUsecase(mockPredictionRepository, mockTopicRepository)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("execute", () => {
    const openTopic = { id: 1, title: "テスト", status: "open" as const, closed_at: null, created_at: new Date() }
    const closedTopic = { ...openTopic, status: "closed" as const }
    const answeredTopic = { ...openTopic, status: "answered" as const }

    it("有効な数値で予想を登録しok: trueを返す", async () => {
      mockFind.mockResolvedValue(openTopic)
      mockSubmit.mockResolvedValue({
        id: 1, fk_topic_id: 1, prediction_type: "number", created_at: new Date(),
      })

      const result = await usecase.execute({ topicId: 1, predict: "42" })

      expect(mockFind).toHaveBeenCalledWith(1)
      expect(mockSubmit).toHaveBeenCalledWith(1, 42)
      expect(result).toEqual({ ok: true })
    })

    it("数値に変換できない文字列の場合はリポジトリを呼び出さずinvalid_predictionを返す", async () => {
      const result = await usecase.execute({ topicId: 1, predict: "abc" })

      expect(mockFind).not.toHaveBeenCalled()
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_prediction" })
    })

    it("空文字の場合はリポジトリを呼び出さずinvalid_predictionを返す", async () => {
      const result = await usecase.execute({ topicId: 1, predict: "" })

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_prediction" })
    })

    it("Topicが存在しない場合はtopic_not_openを返す", async () => {
      mockFind.mockResolvedValue(null)

      const result = await usecase.execute({ topicId: 99, predict: "42" })

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "topic_not_open" })
    })

    it("Topicがclosedの場合はtopic_not_openを返す", async () => {
      mockFind.mockResolvedValue(closedTopic)

      const result = await usecase.execute({ topicId: 1, predict: "42" })

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "topic_not_open" })
    })

    it("Topicがansweredの場合はtopic_not_openを返す", async () => {
      mockFind.mockResolvedValue(answeredTopic)

      const result = await usecase.execute({ topicId: 1, predict: "42" })

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "topic_not_open" })
    })
  })

  describe("list", () => {
    it("予想一覧を返す", async () => {
      const now = new Date()
      mockList.mockResolvedValue([
        { id: 1, fk_topic_id: 1, prediction_type: "number", created_at: now, numbers: [{ predict: 42 }] },
        { id: 2, fk_topic_id: 1, prediction_type: "number", created_at: now, numbers: [{ predict: 100 }] },
      ])

      const result = await usecase.list(1)

      expect(mockList).toHaveBeenCalledWith(1)
      expect(result).toHaveLength(2)
      expect(result[0].predict).toBe(42)
      expect(result[1].predict).toBe(100)
    })

    it("予想がない場合は空配列を返す", async () => {
      mockList.mockResolvedValue([])

      const result = await usecase.list(1)

      expect(result).toEqual([])
    })
  })
})
