import { prisma } from "@/lib/prisma"
import type { BetModel } from "@/generated/prisma"
import type { IBetRepository } from "./IRepository/IBetRepository"

export class BetRepository implements IBetRepository {
  async save(predictionId: number, value: number): Promise<BetModel> {
    return prisma.$transaction(async (tx) => {
      const bet = await tx.bet.upsert({
        where: { fk_prediction_id: predictionId },
        create: { fk_prediction_id: predictionId, value },
        update: { value },
      })
      await tx.prediction.update({
        where: { id: predictionId },
        data: { fk_bet_id: bet.id },
      })
      return bet
    })
  }

  async findByPredictionId(predictionId: number): Promise<BetModel | null> {
    return prisma.bet.findUnique({ where: { fk_prediction_id: predictionId } })
  }
}
