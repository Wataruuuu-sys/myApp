import { Topic } from "@/domain/Topic"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { AddTopicResult } from "@/types/topic"
import type { ITopicUsecase } from "./IUsecase/ITopicUsecase"

export class TopicUsecase implements ITopicUsecase {
  constructor(private readonly repository: ITopicRepository) {}

  async add(title: string): Promise<AddTopicResult> {
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
