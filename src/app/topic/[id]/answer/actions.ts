"use server";

import { answerUsecase } from "@/lib/container";
import { Validation } from "@/lib/validation";
import { executeAction } from "@/lib/action";
import type { SubmitAnswerResult } from "@/types/answer";

export async function submitAnswer(topicId: number, formData: FormData): Promise<SubmitAnswerResult> {
  const answer = Validation.string(formData, "answer");
  if (!answer) {
    return { ok: false, error: "invalid_answer" };
  }
  return executeAction(answerUsecase, { topicId, answer }, ["/topic"]);
}
