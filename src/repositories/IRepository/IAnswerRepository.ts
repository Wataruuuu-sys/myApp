import type { AnswerModel } from "@/generated/prisma"

export interface IAnswerRepository {
  submit(topicId: number, answer: number): Promise<AnswerModel>
}
