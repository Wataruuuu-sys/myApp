import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"
import type { ITopicRepository } from "@/repositories/IRepository/ITopicRepository"
import type { CreatePredictionInput, UpdatePredictionInput, CreatePredictionResult, UpdatePredictionResult, PredictionWithValue } from "@/types/prediction"
import { Prediction } from "@/domain/Prediction"
import type { IPredictionUsecase } from "./IUsecase/IPredictionUsecase"

export class PredictionUsecase implements IPredictionUsecase {
  constructor(
    private readonly predictionRepository: IPredictionRepository,
    private readonly topicRepository: ITopicRepository,
  ) {}

  async create({ topicId, predict }: CreatePredictionInput): Promise<CreatePredictionResult> {
    const parsed = parseFloat(predict)
    if (isNaN(parsed)) {
      return { ok: false, error: "invalid_prediction" }
    }

    const topic = await this.topicRepository.find(topicId)
    if (!topic || topic.status !== "open") {
      return { ok: false, error: "topic_not_open" }
    }

    await this.predictionRepository.create(topicId, parsed)
    return { ok: true }
  }

  async update({ predictionId, predict }: UpdatePredictionInput): Promise<UpdatePredictionResult> {
    const parsed = parseFloat(predict)
    if (isNaN(parsed)) {
      return { ok: false, error: "invalid_prediction" }
    }

    const prediction = await this.predictionRepository.findById(predictionId)
    if (!prediction) {
      return { ok: false, error: "topic_not_open" }
    }

    const topic = await this.topicRepository.find(prediction.fk_topic_id)
    if (!topic || topic.status !== "open") {
      return { ok: false, error: "topic_not_open" }
    }

    await this.predictionRepository.update(predictionId, parsed)
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
