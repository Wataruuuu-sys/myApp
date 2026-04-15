export type TopicInput = { title: string }

export type AddTopicResult =
  | { ok: true }
  | { ok: false; error: "invalid_title" }
