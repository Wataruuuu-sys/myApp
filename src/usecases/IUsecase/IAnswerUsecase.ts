import type { SubmitAnswerResult } from "@/types/answer"

export interface IAnswerUsecase {
  submit(topicId: number, answer: string): Promise<SubmitAnswerResult>
}
