import type { TodoModel } from "@/generated/prisma"

export class Todo {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly createdAt: Date,
  ) {}

  static from(model: TodoModel): Todo {
    return new Todo(model.id, model.title, model.createdAt)
  }
}
