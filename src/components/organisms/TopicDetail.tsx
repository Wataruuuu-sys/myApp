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
    <div>
      <Heading level={1}>{topic.title}</Heading>
      <p>ステータス: {topic.status}</p>

      <section>
        <Heading level={2}>予想</Heading>
        {prediction ? (
          <p>{prediction.predict}</p>
        ) : (
          <>
            <p>予想がない</p>
            {topic.status === "open" && (
              <Anchor href={`/topic/${topic.id}/predictions`}>予想する</Anchor>
            )}
          </>
        )}
      </section>

      {answer && (
        <section>
          <Heading level={2}>回答</Heading>
          <p>{answer.answer}</p>
        </section>
      )}
    </div>
  )
}
