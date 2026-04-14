import type { SubmitAnswerResult, AnswerWithValue } from "@/types/answer"

export interface IAnswerUsecase {
  submit(topicId: number, answer: string): Promise<SubmitAnswerResult>
  findByTopic(topicId: number): Promise<AnswerWithValue | null>
}
