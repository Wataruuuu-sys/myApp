"use server";

import { topicUsecase } from "@/lib/container";
import { Validation } from "@/lib/validation";
import { executeAction } from "@/lib/action";
import type { Topic } from "@/domain/Topic";
import type { AddTopicResult } from "@/types/topic";

export async function topics(): Promise<Topic[]> {
  return topicUsecase.topics();
}

export async function addTopic(formData: FormData): Promise<AddTopicResult> {
  const title = Validation.string(formData, "title");
  if (!title) {
    return { ok: false, error: "invalid_title" };
  }
  return executeAction(topicUsecase, { title }, ["/topic"]);
}
