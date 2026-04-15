import type { PredictionInput, SubmitPredictionResult, PredictionWithValue } from "@/types/prediction"

export interface IPredictionUsecase {
  execute(input: PredictionInput): Promise<SubmitPredictionResult>
  list(topicId: number): Promise<PredictionWithValue[]>
}
