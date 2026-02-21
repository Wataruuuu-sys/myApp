"use client";

import { useRef } from "react";
import { addTodo } from "./actions";

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await addTodo(formData);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">追加</button>
    </form>
  );
}
