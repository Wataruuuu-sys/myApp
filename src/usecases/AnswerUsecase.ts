import type { IAnswerRepository } from "@/repositories/IRepository/IAnswerRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { AnswerInput, SubmitAnswerResult, AnswerWithValue } from "@/types/answer"
import { Answer } from "@/domain/Answer"
import type { IAnswerUsecase } from "./IUsecase/IAnswerUsecase"
import { BaseUsecase } from "./BaseUsecase"

export class AnswerUsecase extends BaseUsecase<AnswerInput, SubmitAnswerResult> implements IAnswerUsecase {
  constructor(
    private readonly answerRepository: IAnswerRepository,
    private readonly topicRepository: ITopicRepository,
  ) {
    super()
  }

  async execute({ topicId, answer }: AnswerInput): Promise<SubmitAnswerResult> {
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
