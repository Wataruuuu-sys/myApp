import type { PredictionType } from "@/generated/prisma"
import type { PredictionModel } from "@/generated/prisma"

export class Prediction {
  constructor(
    readonly id: number,
    readonly topicId: number,
    readonly predictionType: PredictionType,
    readonly createdAt: Date,
  ) {}

  static from(model: PredictionModel): Prediction {
    return new Prediction(model.id, model.fk_topic_id, model.prediction_type, model.created_at)
  }
}
