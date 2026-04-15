import type { Answer as AnswerModel } from "@/generated/prisma"

export interface IAnswerRepository {
  submit(topicId: number, answer: number): Promise<AnswerModel>
  findByTopic(topicId: number): Promise<(AnswerModel & { numbers: Array<{ answer: number }> }) | null>
}
