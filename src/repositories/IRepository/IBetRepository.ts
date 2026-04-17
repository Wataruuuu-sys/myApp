import type { BetModel } from "@/generated/prisma"

export interface IBetRepository {
  save(predictionId: number, value: number): Promise<BetModel>
  findByPredictionId(predictionId: number): Promise<BetModel | null>
}
