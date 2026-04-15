import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"

type Props = {
  action: (formData: FormData) => void
  inputName: string
  step?: string
  submitLabel: string
}

export function NumberInputForm({ action, inputName, step, submitLabel }: Props) {
  return (
    <form action={action}>
      <Input type="number" name={inputName} step={step} required />
      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
