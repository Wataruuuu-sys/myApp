import { describe, it, expect, vi, beforeEach } from "vitest"
import { AnswerUsecase } from "@/usecases/AnswerUsecase"
import type { IAnswerRepository } from "@/repositories/IRepository/IAnswerRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"

const mockSubmit = vi.fn()
const mockFind = vi.fn()

const mockAnswerRepository: IAnswerRepository = {
  submit: mockSubmit,
}

const mockTopicRepository: ITopicRepository = {
  create: vi.fn(),
  all: vi.fn(),
  find: mockFind,
  markAnswered: vi.fn(),
}

describe("AnswerUsecase", () => {
  const usecase = new AnswerUsecase(mockAnswerRepository, mockTopicRepository)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("submit", () => {
    const openTopic = { id: 1, title: "テスト", status: "open" as const, closed_at: null, created_at: new Date() }
    const answeredTopic = { ...openTopic, status: "answered" as const }

    it("有効な数値で回答を登録しok: trueを返す", async () => {
      mockFind.mockResolvedValue(openTopic)
      mockSubmit.mockResolvedValue({
        id: 1, fk_topic_id: 1, answer_type: "number", created_at: new Date(),
      })

      const result = await usecase.submit(1, "42")

      expect(mockFind).toHaveBeenCalledWith(1)
      expect(mockSubmit).toHaveBeenCalledWith(1, 42)
      expect(result).toEqual({ ok: true })
    })

    it("数値に変換できない文字列の場合はリポジトリを呼び出さずinvalid_answerを返す", async () => {
      const result = await usecase.submit(1, "abc")

      expect(mockFind).not.toHaveBeenCalled()
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_answer" })
    })

    it("空文字の場合はリポジトリを呼び出さずinvalid_answerを返す", async () => {
      const result = await usecase.submit(1, "")

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_answer" })
    })

    it("Topicが存在しない場合はalready_answeredを返す", async () => {
      mockFind.mockResolvedValue(null)

      const result = await usecase.submit(99, "42")

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "already_answered" })
    })

    it("Topicが既にansweredの場合はalready_answeredを返す", async () => {
      mockFind.mockResolvedValue(answeredTopic)

      const result = await usecase.submit(1, "42")

      expect(mockSubmit).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "already_answered" })
    })
  })
})
