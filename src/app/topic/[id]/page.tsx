import { answerUsecase, betUsecase, predictionUsecase, topicUsecase } from "@/lib/container"
import { notFound } from "next/navigation"
import { TopicDetail } from "@/components/organisms/TopicDetail"
import { saveBet } from "@/app/topic/[id]/predictions/actions"

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

  const bet = prediction ? await betUsecase.findByPredictionId(prediction.id) : null
  const saveBetAction = prediction ? saveBet.bind(null, topicId, prediction.id) : null

  const answer = topic.status === "answered" ? await answerUsecase.findByTopic(topicId) : null

  return <TopicDetail topic={topic} prediction={prediction} bet={bet} answer={answer} saveBetAction={saveBetAction} />
}
