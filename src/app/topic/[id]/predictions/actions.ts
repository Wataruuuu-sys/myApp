"use server";

import { revalidatePath } from "next/cache";
import { predictionUsecase } from "@/lib/container";
import type { SubmitPredictionResult, PredictionWithValue } from "@/types/prediction";

export async function submitPrediction(topicId: number, formData: FormData): Promise<SubmitPredictionResult> {
  const predict = formData.get("predict");
  if (typeof predict !== "string") {
    return { ok: false, error: "invalid_prediction" };
  }

  const result = await predictionUsecase.submit(topicId, predict);
  if (result.ok) {
    revalidatePath(`/topic/${topicId}`);
  }
  return result;
}

export async function predictions(topicId: number): Promise<PredictionWithValue[]> {
  return predictionUsecase.list(topicId);
}
