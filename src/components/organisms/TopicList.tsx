import { Anchor } from "@/components/atoms/Anchor"
import { ListItem } from "@/components/atoms/ListItem"
import type { Topic } from "@/domain/Topic"

type Props = {
  topics: Topic[]
}

export function TopicList({ topics }: Props) {
  return (
    <div>
      <Anchor href="/topic/new">新規作成</Anchor>
      <ul>
        {topics.map((topic) => (
          <ListItem key={topic.id}>
            <Anchor href={`/topic/${topic.id}`}>{topic.title}</Anchor> [{topic.status}]
          </ListItem>
        ))}
      </ul>
    </div>
  )
}
