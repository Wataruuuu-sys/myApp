"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addTodo(formData: FormData) {
  const title = formData.get("title");
  if (typeof title !== "string" || title.trim() === "") return;

  await prisma.todo.create({ data: { title: title.trim() } });
  revalidatePath("/todo");
}
