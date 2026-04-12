import { describe, it, expect, vi, beforeEach } from "vitest"

const mockCreate = vi.fn()
const mockFindMany = vi.fn()

vi.mock("@/lib/prisma", () => ({
  prisma: {
    todo: {
      create: (...args: Parameters<typeof mockCreate>) => mockCreate(...args),
      findMany: (...args: Parameters<typeof mockFindMany>) => mockFindMany(...args),
    },
  },
}))

import { TodoRepository } from "@/repositories/TodoRepository"

describe("TodoRepository", () => {
  const repository = new TodoRepository()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("create", () => {
    it("正しいクエリ引数でTODOを作成し、TodoModelを返す", async () => {
      const model = { id: 1, title: "テスト", createdAt: new Date() }
      mockCreate.mockResolvedValue(model)

      const result = await repository.create("テスト")

      expect(mockCreate).toHaveBeenCalledWith({ data: { title: "テスト" } })
      expect(result).toEqual(model)
    })
  })

  describe("all", () => {
    it("createdAt降順でTODO一覧を取得し、TodoModel[]を返す", async () => {
      const models = [
        { id: 2, title: "B", createdAt: new Date() },
        { id: 1, title: "A", createdAt: new Date() },
      ]
      mockFindMany.mockResolvedValue(models)

      const result = await repository.all()

      expect(mockFindMany).toHaveBeenCalledWith({ orderBy: { createdAt: "desc" } })
      expect(result).toEqual(models)
    })
  })
})
