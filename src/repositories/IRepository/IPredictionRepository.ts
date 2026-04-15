import type { Prediction as PredictionModel } from "@/generated/prisma"

export interface IPredictionRepository {
  submit(topicId: number, predict: number): Promise<PredictionModel>
  list(topicId: number): Promise<Array<PredictionModel & { numbers: Array<{ predict: number }> }>>
}
