import { TodoRepository } from "@/repositories/TodoRepository"
import { TodoUsecase } from "@/usecases/TodoUsecase"
import type { ITodoUsecase } from "@/usecases/IUsecase/ITodoUsecase"

const todoRepository = new TodoRepository()
export const todoUsecase: ITodoUsecase = new TodoUsecase(todoRepository)
