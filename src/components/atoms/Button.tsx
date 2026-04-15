type Props = {
  type?: "submit" | "button" | "reset"
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function Button({ type = "button", onClick, disabled, children }: Props) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
