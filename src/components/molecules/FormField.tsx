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
    <div>
      <label htmlFor={name}>{label}</label>
      <Input type={type} name={name} placeholder={placeholder} required={required} step={step} />
    </div>
  )
}
