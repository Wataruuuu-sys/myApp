import type { IAnswerRepository } from "@/repositories/IRepository/IAnswerRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { SubmitAnswerResult } from "@/types/answer"
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
}
