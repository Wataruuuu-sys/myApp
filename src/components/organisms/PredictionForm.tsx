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
    <div className="flex flex-col gap-6">
      {topicStatus === "open" && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <NumberInputForm action={action} inputName="predict" step="any" submitLabel="予想する" />
        </div>
      )}
      <ul className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {predictions.map((p) => (
          <ListItem key={p.id}>
            <span className="px-6 block">{p.predict}</span>
          </ListItem>
        ))}
      </ul>
    </div>
  )
}
