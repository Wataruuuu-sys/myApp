import { Heading } from "@/components/atoms/Heading"
import { TopicList } from "@/components/organisms/TopicList"
import { topics } from "./actions"

export const dynamic = 'force-dynamic'

export default async function TopicPage() {
  const topicList = await topics()

  return (
    <div className="flex flex-col gap-6">
      <Heading level={1}>Topics</Heading>
      <TopicList topics={topicList} />
    </div>
  )
}
