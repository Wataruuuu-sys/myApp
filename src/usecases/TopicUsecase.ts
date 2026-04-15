import { Topic } from "@/domain/Topic"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { TopicInput, AddTopicResult } from "@/types/topic"
import type { ITopicUsecase } from "./IUsecase/ITopicUsecase"
import { BaseUsecase } from "./BaseUsecase"

export class TopicUsecase extends BaseUsecase<TopicInput, AddTopicResult> implements ITopicUsecase {
  constructor(private readonly repository: ITopicRepository) {
    super()
  }

  async execute({ title }: TopicInput): Promise<AddTopicResult> {
    const trimmed = title.trim()
    if (trimmed === "") {
      return { ok: false, error: "invalid_title" }
    }
    await this.repository.create(trimmed)
    return { ok: true }
  }

  async topics(): Promise<Topic[]> {
    const models = await this.repository.all()
    return models.map(Topic.from)
  }
}
