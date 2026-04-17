import type { Prediction } from "@/domain/Prediction"
import type { Bet } from "@/domain/Bet"

export type CreatePredictionInput = { topicId: number; predict: string }
export type UpdatePredictionInput = { predictionId: number; predict: string }

export type CreatePredictionResult =
  | { ok: true }
  | { ok: false; error: "invalid_prediction" | "topic_not_open" }

export type UpdatePredictionResult =
  | { ok: true }
  | { ok: false; error: "invalid_prediction" | "topic_not_open" }

export type PredictionWithValue = Prediction & { predict: number }
export type PredictionWithBet = PredictionWithValue & { bet: Bet | null }
