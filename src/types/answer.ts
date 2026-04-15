import type { Answer } from "@/domain/Answer"

export type AnswerInput = { topicId: number; answer: string }

export type SubmitAnswerResult =
  | { ok: true }
  | { ok: false; error: "invalid_answer" | "already_answered" }

export type AnswerWithValue = Answer & { answer: number }
