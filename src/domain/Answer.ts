import type { AnswerType, Answer as AnswerModel } from "@/generated/prisma"

export class Answer {
  constructor(
    readonly id: number,
    readonly topicId: number,
    readonly answerType: AnswerType,
    readonly createdAt: Date,
  ) {}

  static from(model: AnswerModel): Answer {
    return new Answer(model.id, model.fk_topic_id, model.answer_type, model.created_at)
  }
}
