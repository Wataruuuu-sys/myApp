import { Anchor } from "@/components/atoms/Anchor"
import { Heading } from "@/components/atoms/Heading"
import type { Topic } from "@/domain/Topic"
import type { PredictionWithValue } from "@/types/prediction"
import type { AnswerWithValue } from "@/types/answer"

type Props = {
  topic: Topic
  prediction: PredictionWithValue | null
  answer: AnswerWithValue | null
}

export function TopicDetail({ topic, prediction, answer }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={1}>{topic.title}</Heading>
        <p className="text-sm text-muted mt-1">ステータス: {topic.status}</p>
      </div>

      <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <Heading level={2}>予想</Heading>
        <div className="mt-3">
          {prediction ? (
            <p className="text-lg font-semibold">{prediction.predict}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-muted">予想がない</p>
              {topic.status === "open" && (
                <Anchor href={`/topic/${topic.id}/predictions`}>予想する</Anchor>
              )}
            </div>
          )}
        </div>
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
