import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { PredictionInput, SubmitPredictionResult, PredictionWithValue } from "@/types/prediction"
import { Prediction } from "@/domain/Prediction"
import type { IPredictionUsecase } from "./IUsecase/IPredictionUsecase"
import { BaseUsecase } from "./BaseUsecase"

export class PredictionUsecase extends BaseUsecase<PredictionInput, SubmitPredictionResult> implements IPredictionUsecase {
  constructor(
    private readonly predictionRepository: IPredictionRepository,
    private readonly topicRepository: ITopicRepository,
  ) {
    super()
  }

  async execute({ topicId, predict }: PredictionInput): Promise<SubmitPredictionResult> {
    const parsed = parseFloat(predict)
    if (isNaN(parsed)) {
      return { ok: false, error: "invalid_prediction" }
    }

    const topic = await this.topicRepository.find(topicId)
    if (!topic || topic.status !== "open") {
      return { ok: false, error: "topic_not_open" }
    }

    await this.predictionRepository.submit(topicId, parsed)
    return { ok: true }
  }

  async list(topicId: number): Promise<PredictionWithValue[]> {
    const records = await this.predictionRepository.list(topicId)
    return records.map((r) => ({
      ...Prediction.from(r),
      predict: r.numbers[0]?.predict ?? 0,
    }))
  }
}
