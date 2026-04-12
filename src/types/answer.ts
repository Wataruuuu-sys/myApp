export type SubmitAnswerResult =
  | { ok: true }
  | { ok: false; error: "invalid_answer" | "already_answered" }
