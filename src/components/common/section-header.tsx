import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Props {
  title: string
  eyebrow?: string
  href?: string
  linkLabel?: string
}

export function SectionHeader({ title, eyebrow, href, linkLabel = "Tümünü gör" }: Props) {
  return (
    <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-4 px-5 md:px-8">
      <div>
        {eyebrow && <span className="t-eyebrow text-muted-foreground">{eyebrow}</span>}
        <h2 className="t-h1 mt-2">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group inline-flex shrink-0 items-center gap-2 border-b border-foreground/30 pb-1 t-micro font-medium uppercase tracking-[0.16em] transition hover:border-foreground">
          {linkLabel}
          <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
