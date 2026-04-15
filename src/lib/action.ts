import { revalidatePath } from "next/cache"
import type { BaseUsecase } from "@/usecases/BaseUsecase"

export async function executeAction<TInput, TResult extends { ok: boolean }>(
  usecase: BaseUsecase<TInput, TResult>,
  input: TInput,
  paths: string[]
): Promise<TResult> {
  const result = await usecase.execute(input)
  if (result.ok) {
    paths.forEach((path) => revalidatePath(path))
  }
  return result
}
