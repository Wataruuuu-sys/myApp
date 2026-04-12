import { describe, it, expect, vi, beforeEach } from "vitest"

const mockCreate = vi.fn()
const mockFindMany = vi.fn()

vi.mock("@/lib/prisma", () => ({
  prisma: {
    topic: {
      create: (...args: Parameters<typeof mockCreate>) => mockCreate(...args),
      findMany: (...args: Parameters<typeof mockFindMany>) => mockFindMany(...args),
    },
  },
}))

import { TopicRepository } from "@/repositories/TopicRepository"

describe("TopicRepository", () => {
  const repository = new TopicRepository()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("create", () => {
    it("正しいクエリ引数でTopicを作成し、TopicModelを返す", async () => {
      const model = { id: 1, title: "テスト", status: "open", closed_at: null, created_at: new Date() }
      mockCreate.mockResolvedValue(model)

      const result = await repository.create("テスト")

      expect(mockCreate).toHaveBeenCalledWith({ data: { title: "テスト" } })
      expect(result).toEqual(model)
    })
  })

  describe("all", () => {
    it("created_at降順でTopic一覧を取得し、TopicModel[]を返す", async () => {
      const models = [
        { id: 2, title: "B", status: "open", closed_at: null, created_at: new Date() },
        { id: 1, title: "A", status: "open", closed_at: null, created_at: new Date() },
      ]
      mockFindMany.mockResolvedValue(models)

      const result = await repository.all()

      expect(mockFindMany).toHaveBeenCalledWith({ orderBy: { created_at: "desc" } })
      expect(result).toEqual(models)
    })
  })
})
