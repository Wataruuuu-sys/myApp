import type { Topic } from "@/domain/Topic"
import type { TopicInput, AddTopicResult } from "@/types/topic"

export interface ITopicUsecase {
  execute(input: TopicInput): Promise<AddTopicResult>
  topics(): Promise<Topic[]>
}
