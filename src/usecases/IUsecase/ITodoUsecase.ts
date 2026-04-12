import type { Todo } from "@/domain/Todo"
import type { AddTodoResult } from "@/types/todo"

export interface ITodoUsecase {
  add(title: string): Promise<AddTodoResult>
  todos(): Promise<Todo[]>
}
