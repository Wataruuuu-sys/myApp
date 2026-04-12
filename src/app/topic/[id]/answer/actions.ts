"use server";

import { revalidatePath } from "next/cache";
import { answerUsecase } from "@/lib/container";
import type { SubmitAnswerResult } from "@/types/answer";

export async function submitAnswer(topicId: number, formData: FormData): Promise<SubmitAnswerResult> {
  const answer = formData.get("answer");
  if (typeof answer !== "string") {
    return { ok: false, error: "invalid_answer" };
  }

  const result = await answerUsecase.submit(topicId, answer);
  if (result.ok) {
    revalidatePath("/topic");
  }
  return result;
}
