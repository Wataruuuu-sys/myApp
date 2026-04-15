type Props = {
  level: 1 | 2 | 3
  children: React.ReactNode
}

const levelClasses = {
  1: "text-2xl font-bold",
  2: "text-xl font-semibold",
  3: "text-lg font-medium",
}

export function Heading({ level, children }: Props) {
  const Tag = `h${level}` as "h1" | "h2" | "h3"
  return <Tag className={levelClasses[level]}>{children}</Tag>
}
