import type { AnswerInput, SubmitAnswerResult, AnswerWithValue } from "@/types/answer"

export interface IAnswerUsecase {
  execute(input: AnswerInput): Promise<SubmitAnswerResult>
  findByTopic(topicId: number): Promise<AnswerWithValue | null>
}
