"use server";

import { predictionUsecase, betUsecase } from "@/lib/container";
import { Validation } from "@/lib/validation";
import { executeAction } from "@/lib/action";
import { revalidatePath } from "next/cache";
import type { SubmitPredictionResult, PredictionWithValue } from "@/types/prediction";
import type { SaveBetResult } from "@/types/bet";

export async function submitPrediction(topicId: number, formData: FormData): Promise<SubmitPredictionResult> {
  const predict = Validation.string(formData, "predict");
  if (!predict) {
    return { ok: false, error: "invalid_prediction" };
  }
  return executeAction(predictionUsecase, { topicId, predict }, [`/topic/${topicId}`]);
}

export async function predictions(topicId: number): Promise<PredictionWithValue[]> {
  return predictionUsecase.list(topicId);
}

export async function saveBet(topicId: number, predictionId: number, formData: FormData): Promise<SaveBetResult> {
  const value = Validation.string(formData, "value");
  if (!value) {
    return { ok: false, error: "invalid_bet" };
  }
  const result = await betUsecase.save({ predictionId, value });
  if (result.ok) {
    revalidatePath(`/topic/${topicId}`);
  }
  return result;
}
