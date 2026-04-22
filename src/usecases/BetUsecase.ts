import type { IBetRepository } from "@/repositories/IRepository/IBetRepository"
import type { IPredictionRepository } from "@/repositories/IRepository/IPredictionRepository"
import type { BetInput, BetData, SaveBetResult } from "@/types/bet"
import type { IBetUsecase } from "./IUsecase/IBetUsecase"
import { Bet } from "@/domain/Bet"

export class BetUsecase implements IBetUsecase {
  constructor(
    private readonly betRepository: IBetRepository,
    private readonly predictionRepository: IPredictionRepository,
  ) {}

  async save({ predictionId, value }: BetInput): Promise<SaveBetResult> {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) {
      return { ok: false, error: "invalid_bet" }
    }

    const prediction = await this.predictionRepository.findById(predictionId)
    if (!prediction) {
      return { ok: false, error: "prediction_not_found" }
    }

    await this.betRepository.save(predictionId, parsed)
    return { ok: true }
  }

  async findByPredictionId(predictionId: number): Promise<BetData | null> {
    const model = await this.betRepository.findByPredictionId(predictionId)
    if (!model) return null
    const bet = Bet.from(model)
    return { id: bet.id, predictionId: bet.predictionId, value: bet.value }
  }
}
