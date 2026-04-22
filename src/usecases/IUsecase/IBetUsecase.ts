import type { BetInput, BetData, SaveBetResult } from "@/types/bet"

export interface IBetUsecase {
  save(input: BetInput): Promise<SaveBetResult>
  findByPredictionId(predictionId: number): Promise<BetData | null>
}
