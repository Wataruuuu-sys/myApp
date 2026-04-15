import type { Prediction } from "@/domain/Prediction"

export type PredictionInput = { topicId: number; predict: string }

export type SubmitPredictionResult =
  | { ok: true }
  | { ok: false; error: "invalid_prediction" | "topic_not_open" }

export type PredictionWithValue = Prediction & { predict: number }
