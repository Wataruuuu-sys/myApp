import { TodoRepository } from "@/repositories/TodoRepository"
import { TodoUsecase } from "@/usecases/TodoUsecase"
import type { ITodoUsecase } from "@/usecases/IUsecase/ITodoUsecase"
import { TopicRepository } from "@/repositories/TopicRepository"
import { TopicUsecase } from "@/usecases/TopicUsecase"
import type { ITopicUsecase } from "@/usecases/IUsecase/ITopicUsecase"

const todoRepository = new TodoRepository()
export const todoUsecase: ITodoUsecase = new TodoUsecase(todoRepository)

const topicRepository = new TopicRepository()
export const topicUsecase: ITopicUsecase = new TopicUsecase(topicRepository)
