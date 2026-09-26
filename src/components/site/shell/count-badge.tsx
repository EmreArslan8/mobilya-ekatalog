import { cn } from "@/lib/utils"

export function CountBadge({ n, className }: { n: number; className?: string }) {
  if (!n) return null
  return (
    <span
      key={n}
      className={cn(
        "absolute grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 font-semibold leading-none text-[0.6rem] text-background animate-in zoom-in-50 duration-300",
        className
      )}
    >
      {n}
    </span>
  )
}
