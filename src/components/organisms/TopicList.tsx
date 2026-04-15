import { Anchor } from "@/components/atoms/Anchor"
import type { Topic } from "@/domain/Topic"

type Props = {
  topics: Topic[]
}

const statusBadgeClasses: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-600",
}

export function TopicList({ topics }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <span className="font-semibold text-sm text-muted">トピック一覧</span>
        <Anchor href="/topic/new">新規作成</Anchor>
      </div>
      <ul className="divide-y divide-border">
        {topics.map((topic) => (
          <li key={topic.id} className="px-6 py-3 flex items-center justify-between">
            <Anchor href={`/topic/${topic.id}`}>{topic.title}</Anchor>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadgeClasses[topic.status] ?? "bg-gray-100 text-gray-600"}`}>
              {topic.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
