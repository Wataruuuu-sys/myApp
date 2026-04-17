import type { CreatePredictionInput, UpdatePredictionInput, CreatePredictionResult, UpdatePredictionResult, PredictionWithValue } from "@/types/prediction"

export interface IPredictionUsecase {
  create(input: CreatePredictionInput): Promise<CreatePredictionResult>
  update(input: UpdatePredictionInput): Promise<UpdatePredictionResult>
  list(topicId: number): Promise<PredictionWithValue[]>
}
