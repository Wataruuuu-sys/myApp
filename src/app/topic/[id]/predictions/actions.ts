"use server";

import { predictionUsecase } from "@/lib/container";
import { Validation } from "@/lib/validation";
import { executeAction } from "@/lib/action";
import type { SubmitPredictionResult, PredictionWithValue } from "@/types/prediction";

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
