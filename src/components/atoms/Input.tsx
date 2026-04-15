type Props = {
  type?: "text" | "number"
  name: string
  placeholder?: string
  required?: boolean
  step?: string
}

export function Input({ type = "text", name, placeholder, required, step }: Props) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      step={step}
      className="border border-border rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}
