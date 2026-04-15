import { describe, it, expect, vi, beforeEach } from "vitest"
import { TopicUsecase } from "@/usecases/TopicUsecase"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"

const mockRepository: ITopicRepository = {
  create: vi.fn(),
  all: vi.fn(),
  find: vi.fn(),
  markAnswered: vi.fn(),
}

describe("TopicUsecase", () => {
  const usecase = new TopicUsecase(mockRepository)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("execute", () => {
    it("有効なタイトルでTopicを追加しok: trueを返す", async () => {
      vi.mocked(mockRepository.create).mockResolvedValue({
        id: 1, title: "テスト", status: "open", closed_at: null, created_at: new Date(),
      })

      const result = await usecase.execute({ title: "テスト" })

      expect(mockRepository.create).toHaveBeenCalledWith("テスト")
      expect(result).toEqual({ ok: true })
    })

    it("前後の空白をtrimしてTopicを追加する", async () => {
      vi.mocked(mockRepository.create).mockResolvedValue({
        id: 1, title: "テスト", status: "open", closed_at: null, created_at: new Date(),
      })

      await usecase.execute({ title: "  テスト  " })

      expect(mockRepository.create).toHaveBeenCalledWith("テスト")
    })

    it("空文字の場合はリポジトリを呼び出さずok: false, error: invalid_titleを返す", async () => {
      const result = await usecase.execute({ title: "" })

      expect(mockRepository.create).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_title" })
    })

    it("空白のみの場合はリポジトリを呼び出さずok: false, error: invalid_titleを返す", async () => {
      const result = await usecase.execute({ title: "   " })

      expect(mockRepository.create).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_title" })
    })
  })

  describe("topics", () => {
    it("TopicModelをTopicドメインオブジェクトに変換して返す", async () => {
      const created_at = new Date()
      vi.mocked(mockRepository.all).mockResolvedValue([
        { id: 1, title: "テスト", status: "open", closed_at: null, created_at },
      ])

      const result = await usecase.topics()

      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({ id: 1, title: "テスト", status: "open", closedAt: null, createdAt: created_at })
    })
  })
})
