import { NumberInputForm } from "@/components/molecules/NumberInputForm"

type Props = {
  action: (formData: FormData) => void
}

export function AnswerForm({ action }: Props) {
  return <NumberInputForm action={action} inputName="answer" step="any" submitLabel="回答する" />
}
