import { answerUsecase, betUsecase, predictionUsecase, topicUsecase } from "@/lib/container"
import { notFound } from "next/navigation"
import { TopicDetail } from "@/components/organisms/TopicDetail"
import type { PredictionWithBet } from "@/types/prediction"

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
  const predictions: PredictionWithBet[] = await Promise.all(
    predictionList.map(async (p) => ({
      ...p,
      bet: await betUsecase.findByPredictionId(p.id),
    }))
  )

  const answer = topic.status === "answered" ? await answerUsecase.findByTopic(topicId) : null

  return <TopicDetail topic={topic} predictions={predictions} answer={answer} topicId={topicId} />
}
