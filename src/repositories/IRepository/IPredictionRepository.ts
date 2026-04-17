import type { Prediction as PredictionModel } from "@/generated/prisma"

export interface IPredictionRepository {
  create(topicId: number, predict: number): Promise<PredictionModel>
  update(predictionId: number, predict: number): Promise<void>
  list(topicId: number): Promise<Array<PredictionModel & { numbers: Array<{ predict: number }> }>>
  findById(id: number): Promise<PredictionModel | null>
}
