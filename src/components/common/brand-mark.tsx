import { cn } from "@/lib/utils"

/** Logo yerine geçen monogram. Gerçek kurulumda firmanın logosu buraya gelir. */
export function BrandMark({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("grid size-8 shrink-0 place-items-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground", className)}>
      {name.trim()[0]?.toLocaleUpperCase("tr")}
    </span>
  )
}
