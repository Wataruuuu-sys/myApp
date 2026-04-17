import { Anchor } from "@/components/atoms/Anchor"
import { Heading } from "@/components/atoms/Heading"
import { PredictionBetCard } from "@/components/organisms/PredictionBetCard"
import type { Topic } from "@/domain/Topic"
import type { PredictionWithBet } from "@/types/prediction"
import type { AnswerWithValue } from "@/types/answer"
import { saveBet, updatePrediction } from "@/app/topic/[id]/predictions/actions"

type Props = {
  topic: Topic
  predictions: PredictionWithBet[]
  answer: AnswerWithValue | null
  topicId: number
}

export function TopicDetail({ topic, predictions, answer, topicId }: Props) {
  const topicOpen = topic.status === "open"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={1}>{topic.title}</Heading>
        <p className="text-sm text-muted mt-1">ステータス: {topic.status}</p>
      </div>

      <section className="flex flex-col gap-3">
        <Heading level={2}>予想</Heading>
        {predictions.length === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-muted">予想がない</p>
            {topicOpen && (
              <Anchor href={`/topic/${topicId}/predictions`}>予想する</Anchor>
            )}
          </div>
        ) : (
          <>
            {predictions.map((p) => (
              <PredictionBetCard
                key={p.id}
                prediction={p}
                updatePredictionAction={updatePrediction.bind(null, p.id, topicId)}
                saveBetAction={saveBet.bind(null, topicId, p.id)}
                topicOpen={topicOpen}
              />
            ))}
            {topicOpen && (
              <Anchor href={`/topic/${topicId}/predictions`}>+ 予想を追加</Anchor>
            )}
          </>
        )}
      </section>

      {answer && (
        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <Heading level={2}>回答</Heading>
          <p className="text-lg font-semibold mt-3">{answer.answer}</p>
        </section>
      )}
    </div>
  )
}
