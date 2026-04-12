import { Todo } from "@/domain/Todo"
import type { ITodoRepository } from "@/repositories/IRepository/ITodoRepository"
import type { AddTodoResult } from "@/types/todo"
import type { ITodoUsecase } from "./IUsecase/ITodoUsecase"

export class TodoUsecase implements ITodoUsecase {
  constructor(private readonly repository: ITodoRepository) {}

  async add(title: string): Promise<AddTodoResult> {
    const trimmed = title.trim()
    if (trimmed === "") {
      return { ok: false, error: "invalid_title" }
    }
    await this.repository.create(trimmed)
    return { ok: true }
  }

  async todos(): Promise<Todo[]> {
    const models = await this.repository.all()
    return models.map(Todo.from)
  }
}
