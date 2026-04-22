export type BetInput = { predictionId: number; value: string }

export type SaveBetResult =
  | { ok: true }
  | { ok: false; error: "invalid_bet" | "prediction_not_found" }

export type BetData = { id: number; predictionId: number; value: number }
