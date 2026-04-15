type Props = {
  level: 1 | 2 | 3
  children: React.ReactNode
}

export function Heading({ level, children }: Props) {
  const Tag = `h${level}` as "h1" | "h2" | "h3"
  return <Tag>{children}</Tag>
}
