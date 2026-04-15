import { topicUsecase } from "@/lib/container"
import { notFound } from "next/navigation"
import { Heading } from "@/components/atoms/Heading"
import { PredictionForm } from "@/components/organisms/PredictionForm"
import { submitPrediction, predictions } from "./actions"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ id: string }>
}

export default async function PredictionPage({ params }: Props) {
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

  const predictionList = await predictions(topicId)
  const action = submitPrediction.bind(null, topicId)

  return (
    <div>
      <Heading level={1}>{topic.title}</Heading>
      <PredictionForm topicStatus={topic.status} predictions={predictionList} action={action} />
    </div>
  )
}
