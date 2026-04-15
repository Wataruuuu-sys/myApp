import { Heading } from "@/components/atoms/Heading"
import { NumberInputForm } from "@/components/molecules/NumberInputForm"

type Props = {
  action: (formData: FormData) => void
}

export function AnswerForm({ action }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-3">
      <Heading level={3}>回答を入力</Heading>
      <NumberInputForm action={action} inputName="answer" step="any" submitLabel="回答する" />
    </div>
  )
}
