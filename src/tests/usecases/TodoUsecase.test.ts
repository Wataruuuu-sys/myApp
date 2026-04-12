import { describe, it, expect, vi, beforeEach } from "vitest"
import { TodoUsecase } from "@/usecases/TodoUsecase"
import type { ITodoRepository } from "@/repositories/IRepository/ITodoRepository"

const mockRepository: ITodoRepository = {
  create: vi.fn(),
  all: vi.fn(),
}

describe("TodoUsecase", () => {
  const usecase = new TodoUsecase(mockRepository)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("add", () => {
    it("有効なタイトルでTODOを追加しok: trueを返す", async () => {
      vi.mocked(mockRepository.create).mockResolvedValue({ id: 1, title: "テスト", createdAt: new Date() })

      const result = await usecase.add("テスト")

      expect(mockRepository.create).toHaveBeenCalledWith("テスト")
      expect(result).toEqual({ ok: true })
    })

    it("前後の空白をtrimしてTODOを追加する", async () => {
      vi.mocked(mockRepository.create).mockResolvedValue({ id: 1, title: "テスト", createdAt: new Date() })

      await usecase.add("  テスト  ")

      expect(mockRepository.create).toHaveBeenCalledWith("テスト")
    })

    it("空文字の場合はリポジトリを呼び出さずok: false, error: invalid_titleを返す", async () => {
      const result = await usecase.add("")

      expect(mockRepository.create).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_title" })
    })

    it("空白のみの場合はリポジトリを呼び出さずok: false, error: invalid_titleを返す", async () => {
      const result = await usecase.add("   ")

      expect(mockRepository.create).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: false, error: "invalid_title" })
    })
  })

  describe("todos", () => {
    it("TodoModelをTodoドメインオブジェクトに変換して返す", async () => {
      const createdAt = new Date()
      vi.mocked(mockRepository.all).mockResolvedValue([
        { id: 1, title: "テスト", createdAt },
      ])

      const result = await usecase.todos()

      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({ id: 1, title: "テスト", createdAt })
    })
  })
})
