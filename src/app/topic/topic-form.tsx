"use client";

import { useRef } from "react";
import { addTopic } from "./actions";

export function TopicForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await addTopic(formData);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <input type="text" name="title" placeholder="タイトルを入力" />
      <button type="submit">作成</button>
    </form>
  );
}
