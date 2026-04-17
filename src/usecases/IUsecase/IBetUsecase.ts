import type { BetInput, SaveBetResult } from "@/types/bet"
import type { Bet } from "@/domain/Bet"

export interface IBetUsecase {
  save(input: BetInput): Promise<SaveBetResult>
  findByPredictionId(predictionId: number): Promise<Bet | null>
}
