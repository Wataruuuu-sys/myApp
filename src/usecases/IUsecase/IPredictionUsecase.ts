import type { SubmitPredictionResult, PredictionWithValue } from "@/types/prediction"

export interface IPredictionUsecase {
  submit(topicId: number, predict: string): Promise<SubmitPredictionResult>
  list(topicId: number): Promise<PredictionWithValue[]>
}
