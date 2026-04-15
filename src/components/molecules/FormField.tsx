import { Input } from "@/components/atoms/Input"

type Props = {
  label: string
  name: string
  type?: "text" | "number"
  placeholder?: string
  required?: boolean
  step?: string
}

export function FormField({ label, name, type = "text", placeholder, required, step }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Input type={type} name={name} placeholder={placeholder} required={required} step={step} />
    </div>
  )
}
