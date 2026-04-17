import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import type { SaveBetResult } from "@/types/bet"

type Props = {
  currentValue: number | null
  action: (formData: FormData) => Promise<SaveBetResult>
}

export function BetForm({ currentValue, action }: Props) {
  return (
    <form action={action} className="flex gap-2 items-center">
      <Input type="number" name="value" step="any" required defaultValue={currentValue ?? undefined} />
      <Button type="submit">賭ける</Button>
    </form>
  )
}
