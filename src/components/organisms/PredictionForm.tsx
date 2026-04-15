import { NumberInputForm } from "@/components/molecules/NumberInputForm"
import { ListItem } from "@/components/atoms/ListItem"
import type { TopicStatus } from "@/generated/prisma"
import type { PredictionWithValue } from "@/types/prediction"

type Props = {
  topicStatus: TopicStatus
  predictions: PredictionWithValue[]
  action: (formData: FormData) => void
}

export function PredictionForm({ topicStatus, predictions, action }: Props) {
  return (
    <div>
      {topicStatus === "open" && (
        <NumberInputForm action={action} inputName="predict" step="any" submitLabel="予想する" />
      )}
      <ul>
        {predictions.map((p) => (
          <ListItem key={p.id}>{p.predict}</ListItem>
        ))}
      </ul>
    </div>
  )
}
