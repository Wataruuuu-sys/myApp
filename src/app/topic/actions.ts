"use server";

import { revalidatePath } from "next/cache";
import { topicUsecase } from "@/lib/container";
import type { Topic } from "@/domain/Topic";
import type { AddTopicResult } from "@/types/topic";

export async function topics(): Promise<Topic[]> {
  return topicUsecase.topics();
}

export async function addTopic(formData: FormData): Promise<AddTopicResult> {
  const title = formData.get("title");
  if (typeof title !== "string") {
    return { ok: false, error: "invalid_title" };
  }

  const result = await topicUsecase.add(title);
  if (result.ok) {
    revalidatePath("/topic");
  }
  return result;
}
