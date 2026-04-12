import { prisma } from "@/lib/prisma"
import type { TodoModel } from "@/generated/prisma"
import type { ITodoRepository } from "./IRepository/ITodoRepository"

export class TodoRepository implements ITodoRepository {
  async create(title: string): Promise<TodoModel> {
    return prisma.todo.create({ data: { title } })
  }

  async all(): Promise<TodoModel[]> {
    return prisma.todo.findMany({ orderBy: { createdAt: "desc" } })
  }
}
