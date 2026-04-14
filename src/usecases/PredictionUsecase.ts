import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { SubmitPredictionResult, PredictionWithValue } from "@/types/prediction"
import { Prediction } from "@/domain/Prediction"
import type { IPredictionUsecase } from "./IUsecase/IPredictionUsecase"

export class PredictionUsecase implements IPredictionUsecase {
  constructor(
    private readonly predictionRepository: IPredictionRepository,
    private readonly topicRepository: ITopicRepository,
  ) {}

  async submit(topicId: number, predict: string): Promise<SubmitPredictionResult> {
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
