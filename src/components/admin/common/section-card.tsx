import { cn } from "@/lib/utils"

export function SectionCard({ title, text, children, className, action }: { title: string; text?: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <section className={cn("rounded-xl border bg-card p-5 shadow-xs md:p-6", className)}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">{title}</h2>
          {text && <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
