"use client"

import { useRef } from "react"
import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import { addTopic } from "@/app/topic/actions"

export function TopicForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    await addTopic(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <Input type="text" name="title" placeholder="タイトルを入力" />
      <Button type="submit">作成</Button>
    </form>
  )
}
