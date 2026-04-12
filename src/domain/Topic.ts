import type { TopicStatus } from "@/generated/prisma"
import type { TopicModel } from "@/generated/prisma"

export class Topic {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly status: TopicStatus,
    readonly closedAt: Date | null,
    readonly createdAt: Date,
  ) {}

  static from(model: TopicModel): Topic {
    return new Topic(model.id, model.title, model.status, model.closed_at, model.created_at)
  }
}
