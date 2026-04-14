import type { IAnswerRepository } from "@/repositories/IRepository/IAnswerRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { SubmitAnswerResult, AnswerWithValue } from "@/types/answer"
import { Answer } from "@/domain/Answer"
import type { IAnswerUsecase } from "./IUsecase/IAnswerUsecase"

export class AnswerUsecase implements IAnswerUsecase {
  constructor(
    private readonly answerRepository: IAnswerRepository,
    private readonly topicRepository: ITopicRepository,
  ) {}

  async submit(topicId: number, answer: string): Promise<SubmitAnswerResult> {
    const parsed = parseFloat(answer)
    if (isNaN(parsed)) {
      return { ok: false, error: "invalid_answer" }
    }

    const topic = await this.topicRepository.find(topicId)
    if (!topic || topic.status === "answered") {
      return { ok: false, error: "already_answered" }
    }

    await this.answerRepository.submit(topicId, parsed)
    return { ok: true }
  }

  async findByTopic(topicId: number): Promise<AnswerWithValue | null> {
    const record = await this.answerRepository.findByTopic(topicId)
    if (!record) return null
    return { ...Answer.from(record), answer: record.numbers[0]?.answer ?? 0 }
  }
}
