import { TopicRepository } from "@/repositories/TopicRepository"
import { TopicUsecase } from "@/usecases/TopicUsecase"
import type { ITopicUsecase } from "@/usecases/IUsecase/ITopicUsecase"
import { AnswerRepository } from "@/repositories/AnswerRepository"
import { AnswerUsecase } from "@/usecases/AnswerUsecase"
import type { IAnswerUsecase } from "@/usecases/IUsecase/IAnswerUsecase"
import { PredictionRepository } from "@/repositories/PredictionRepository"
import { PredictionUsecase } from "@/usecases/PredictionUsecase"
import type { IPredictionUsecase } from "@/usecases/IUsecase/IPredictionUsecase"

const topicRepository = new TopicRepository()
export const topicUsecase: ITopicUsecase = new TopicUsecase(topicRepository)

const answerRepository = new AnswerRepository()
export const answerUsecase: IAnswerUsecase = new AnswerUsecase(answerRepository, topicRepository)

const predictionRepository = new PredictionRepository()
export const predictionUsecase: IPredictionUsecase = new PredictionUsecase(predictionRepository, topicRepository)
