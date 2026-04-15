type Props = {
  children: React.ReactNode
}

export function ListItem({ children }: Props) {
  return <li className="py-1">{children}</li>
}
