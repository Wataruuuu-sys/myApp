type Props = {
  type?: "text" | "number"
  name: string
  placeholder?: string
  required?: boolean
  step?: string
}

export function Input({ type = "text", name, placeholder, required, step }: Props) {
  return (
    <input type={type} name={name} placeholder={placeholder} required={required} step={step} />
  )
}
