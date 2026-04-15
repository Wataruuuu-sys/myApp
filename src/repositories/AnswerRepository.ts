import { prisma } from "@/lib/prisma"
import type { Answer as AnswerModel } from "@/generated/prisma"
import type { IAnswerRepository } from "./IRepository/IAnswerRepository"

export class AnswerRepository implements IAnswerRepository {
  async findByTopic(topicId: number): Promise<(AnswerModel & { numbers: Array<{ answer: number }> }) | null> {
    return prisma.answer.findFirst({
      where: { fk_topic_id: topicId },
      include: { numbers: { select: { answer: true } } },
    })
  }

  async submit(topicId: number, answer: number): Promise<AnswerModel> {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.answer.findFirst({ where: { fk_topic_id: topicId } })
      if (existing) {
        await tx.answerNumber.updateMany({ where: { fk_answer_id: existing.id }, data: { answer } })
        return existing
      }
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
