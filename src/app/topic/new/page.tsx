import { Heading } from "@/components/atoms/Heading"
import { Anchor } from "@/components/atoms/Anchor"
import { TopicForm } from "@/components/organisms/TopicForm"

export default function TopicNewPage() {
  return (
    <div>
      <Heading level={1}>新規Topic作成</Heading>
      <TopicForm />
      <Anchor href="/topic">一覧に戻る</Anchor>
    </div>
  )
}
