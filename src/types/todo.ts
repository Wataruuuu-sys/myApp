export type AddTodoRequest = {
  title: string
}

export type AddTodoResult =
  | { ok: true }
  | { ok: false; error: "invalid_title" }
