type Props = {
  type?: "submit" | "button" | "reset"
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "ghost"
  children: React.ReactNode
}

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-hover rounded-md px-4 py-2 font-medium",
  ghost: "text-primary hover:underline px-4 py-2",
}

export function Button({ type = "button", onClick, disabled, variant = "primary", children }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
