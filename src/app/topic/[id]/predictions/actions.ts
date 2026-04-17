"use server";

import { predictionUsecase, betUsecase } from "@/lib/container";
import { Validation } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import type { CreatePredictionResult, UpdatePredictionResult, PredictionWithValue } from "@/types/prediction";
import type { SaveBetResult } from "@/types/bet";

export async function createPrediction(topicId: number, formData: FormData): Promise<CreatePredictionResult> {
  const predict = Validation.string(formData, "predict");
  if (!predict) {
    return { ok: false, error: "invalid_prediction" };
  }
  const result = await predictionUsecase.create({ topicId, predict });
  if (result.ok) {
    revalidatePath(`/topic/${topicId}`);
  }
  return result;
}

export async function updatePrediction(predictionId: number, topicId: number, formData: FormData): Promise<UpdatePredictionResult> {
  const predict = Validation.string(formData, "predict");
  if (!predict) {
    return { ok: false, error: "invalid_prediction" };
  }
  const result = await predictionUsecase.update({ predictionId, predict });
  if (result.ok) {
    revalidatePath(`/topic/${topicId}`);
  }
  return result;
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
