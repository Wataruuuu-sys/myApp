import { prisma } from "@/lib/prisma"
import type { PredictionModel } from "@/generated/prisma"
import type { IPredictionRepository } from "./IRepository/IPredictionRepository"

export class PredictionRepository implements IPredictionRepository {
  async submit(topicId: number, predict: number): Promise<PredictionModel> {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.prediction.findFirst({ where: { fk_topic_id: topicId } })
      if (existing) {
        await tx.predictionNumber.updateMany({ where: { fk_prediction_id: existing.id }, data: { predict } })
        return existing
      }
      const created = await tx.prediction.create({
        data: { fk_topic_id: topicId, prediction_type: "number" },
      })
      await tx.predictionNumber.create({
        data: { fk_prediction_id: created.id, predict },
      })
      return created
    })
  }

  async list(topicId: number): Promise<Array<PredictionModel & { numbers: Array<{ predict: number }> }>> {
    return prisma.prediction.findMany({
      where: { fk_topic_id: topicId },
      include: { numbers: { select: { predict: true } } },
    })
  }
}
