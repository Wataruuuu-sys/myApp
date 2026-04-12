import { describe, it, expect, vi, beforeEach } from "vitest"

const mockAnswerCreate = vi.fn()
const mockAnswerNumberCreate = vi.fn()
const mockTopicUpdate = vi.fn()
const mockTransaction = vi.fn()

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: (...args: Parameters<typeof mockTransaction>) => mockTransaction(...args),
  },
}))

import { AnswerRepository } from "@/repositories/AnswerRepository"

describe("AnswerRepository", () => {
  const repository = new AnswerRepository()

  beforeEach(() => {
    vi.clearAllMocks()
    mockTransaction.mockImplementation(async (fn: (tx: {
      answer: { create: typeof mockAnswerCreate },
      answerNumber: { create: typeof mockAnswerNumberCreate },
      topic: { update: typeof mockTopicUpdate },
    }) => unknown) =>
      fn({
        answer: { create: mockAnswerCreate },
        answerNumber: { create: mockAnswerNumberCreate },
        topic: { update: mockTopicUpdate },
      })
    )
  })

  describe("submit", () => {
    it("Answer・AnswerNumber・Topic更新を正しいクエリ引数でトランザクション内に実行しAnswerModelを返す", async () => {
      const answerModel = { id: 1, fk_topic_id: 1, answer_type: "number", created_at: new Date() }
      mockAnswerCreate.mockResolvedValue(answerModel)
      mockAnswerNumberCreate.mockResolvedValue({})
      mockTopicUpdate.mockResolvedValue({})

      const result = await repository.submit(1, 42)

      expect(mockAnswerCreate).toHaveBeenCalledWith({
        data: { fk_topic_id: 1, answer_type: "number" },
      })
      expect(mockAnswerNumberCreate).toHaveBeenCalledWith({
        data: { fk_answer_id: 1, answer: 42 },
      })
      expect(mockTopicUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: "answered" },
      })
      expect(result).toEqual(answerModel)
    })
  })
})
