import type { LucideIcon } from "lucide-react"
import { LinkButton } from "@/components/common/link-button"

interface Props {
  icon: LucideIcon
  title: string
  text: string
  action?: { label: string; href: string }
}

export function EmptyState({ icon: Icon, title, text, action }: Props) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-20 text-center">
      <div className="mb-5 grid size-20 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-8" strokeWidth={1.5} />
      </div>
      <h2 className="t-h2">{title}</h2>
      <p className="t-body mt-2 text-muted-foreground">{text}</p>
      {action && (
        <LinkButton size="lg" className="mt-6 h-11 rounded-full px-6" href={action.href}>
          {action.label}
        </LinkButton>
      )}
    </div>
  )
}
