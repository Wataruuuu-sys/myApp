import type { BetModel } from "@/generated/prisma"

export class Bet {
  constructor(
    readonly id: number,
    readonly predictionId: number,
    readonly value: number,
  ) {}

  static from(model: BetModel): Bet {
    return new Bet(model.id, model.fk_prediction_id, model.value)
  }
}
