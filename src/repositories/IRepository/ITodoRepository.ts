import type { TodoModel } from "@/generated/prisma"

export interface ITodoRepository {
  create(title: string): Promise<TodoModel>
  all(): Promise<TodoModel[]>
}
