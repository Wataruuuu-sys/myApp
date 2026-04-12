import { prisma } from "@/lib/prisma"
import type { AnswerModel } from "@/generated/prisma"
import type { IAnswerRepository } from "./IRepository/IAnswerRepository"

export class AnswerRepository implements IAnswerRepository {
  async submit(topicId: number, answer: number): Promise<AnswerModel> {
    return prisma.$transaction(async (tx) => {
      const created = await tx.answer.create({
        data: { fk_topic_id: topicId, answer_type: "number" },
      })
      await tx.answerNumber.create({
        data: { fk_answer_id: created.id, answer },
      })
      await tx.topic.update({
        where: { id: topicId },
        data: { status: "answered" },
      })
      return created
    })
  }
}
