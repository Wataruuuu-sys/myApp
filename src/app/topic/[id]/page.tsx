import { answerUsecase, predictionUsecase, topicUsecase } from "@/lib/container"
import { notFound } from "next/navigation"
import Link from "next/link"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ id: string }>
}

export default async function TopicDetailPage({ params }: Props) {
  const { id } = await params
  const topicId = parseInt(id, 10)
  if (isNaN(topicId)) {
    notFound()
  }

  const topicList = await topicUsecase.topics()
  const topic = topicList.find((t) => t.id === topicId)
  if (!topic) {
    notFound()
  }

  const predictionList = await predictionUsecase.list(topicId)
  const prediction = predictionList[0] ?? null

  const answer = topic.status === "answered" ? await answerUsecase.findByTopic(topicId) : null

  return (
    <div>
      <h1>{topic.title}</h1>
      <p>ステータス: {topic.status}</p>

      <section>
        <h2>予想</h2>
        {prediction ? (
          <p>{prediction.predict}</p>
        ) : (
          <>
            <p>予想がない</p>
            {topic.status === "open" && (
              <Link href={`/topic/${topicId}/predictions`}>予想する</Link>
            )}
          </>
        )}
      </section>

      {answer && (
        <section>
          <h2>回答</h2>
          <p>{answer.answer}</p>
        </section>
      )}
    </div>
  )
}
