"use server";

import { revalidatePath } from "next/cache";
import { todoUsecase } from "@/lib/container";
import type { Todo } from "@/domain/Todo";
import type { AddTodoResult } from "@/types/todo";

export async function todos(): Promise<Todo[]> {
  return todoUsecase.todos();
}

export async function addTodo(formData: FormData): Promise<AddTodoResult> {
  const title = formData.get("title");
  if (typeof title !== "string") {
    return { ok: false, error: "invalid_title" };
  }

  const result = await todoUsecase.add(title);
  if (result.ok) {
    revalidatePath("/todo");
  }
  return result;
}
