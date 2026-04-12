import { prisma } from "@/lib/prisma"
import type { TopicModel } from "@/generated/prisma"
import type { ITopicRepository } from "./IRepository/ITopicRepository"

export class TopicRepository implements ITopicRepository {
  async create(title: string): Promise<TopicModel> {
    return prisma.topic.create({ data: { title } })
  }

  async all(): Promise<TopicModel[]> {
    return prisma.topic.findMany({ orderBy: { created_at: "desc" } })
  }
}
