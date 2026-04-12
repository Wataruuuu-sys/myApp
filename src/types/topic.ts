export type AddTopicResult =
  | { ok: true }
  | { ok: false; error: "invalid_title" }
