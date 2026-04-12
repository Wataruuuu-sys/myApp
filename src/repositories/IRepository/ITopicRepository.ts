import type { TopicModel } from "@/generated/prisma"

export interface ITopicRepository {
  create(title: string): Promise<TopicModel>
  all(): Promise<TopicModel[]>
}
