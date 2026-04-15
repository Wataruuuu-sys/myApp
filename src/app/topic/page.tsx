import { Heading } from "@/components/atoms/Heading"
import { TopicList } from "@/components/organisms/TopicList"
import { topics } from "./actions"

export const dynamic = 'force-dynamic'

export default async function TopicPage() {
  const topicList = await topics()

  return (
    <div>
      <Heading level={1}>Topics</Heading>
      <TopicList topics={topicList} />
    </div>
  )
}
