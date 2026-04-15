import type { Topic as TopicModel } from "@/generated/prisma"

export interface ITopicRepository {
  create(title: string): Promise<TopicModel>
  all(): Promise<TopicModel[]>
  find(id: number): Promise<TopicModel | null>
  markAnswered(id: number): Promise<void>
}
