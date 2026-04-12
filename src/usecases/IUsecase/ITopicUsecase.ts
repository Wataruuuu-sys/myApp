import type { Topic } from "@/domain/Topic"
import type { AddTopicResult } from "@/types/topic"

export interface ITopicUsecase {
  add(title: string): Promise<AddTopicResult>
  topics(): Promise<Topic[]>
}
