import { prisma } from "@/lib/prisma"
import type { Prediction as PredictionModel } from "@/generated/prisma"
import type { IPredictionRepository } from "./IRepository/IPredictionRepository"

export class PredictionRepository implements IPredictionRepository {
  async create(topicId: number, predict: number): Promise<PredictionModel> {
    return prisma.$transaction(async (tx) => {
      const created = await tx.prediction.create({
        data: { fk_topic_id: topicId, prediction_type: "number" },
      })
      await tx.predictionNumber.create({
        data: { fk_prediction_id: created.id, predict },
      })
      return created
    })
  }

  async update(predictionId: number, predict: number): Promise<void> {
    await prisma.predictionNumber.updateMany({
      where: { fk_prediction_id: predictionId },
      data: { predict },
    })
  }

  async list(topicId: number): Promise<Array<PredictionModel & { numbers: Array<{ predict: number }> }>> {
    return prisma.prediction.findMany({
      where: { fk_topic_id: topicId },
      include: { numbers: { select: { predict: true } } },
    })
  }

  async findById(id: number): Promise<PredictionModel | null> {
    return prisma.prediction.findUnique({ where: { id } })
  }
}
