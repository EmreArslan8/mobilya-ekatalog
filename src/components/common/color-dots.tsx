import type { Color } from "@/lib/types"

export function ColorDots({ colors, max = 4 }: { colors: Color[]; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {colors.slice(0, max).map((c) => (
        <span key={c.name} title={c.name} className="size-2.5 rounded-full ring-1 ring-black/15 ring-inset" style={{ background: c.hex }} />
      ))}
      {colors.length > max && <span className="t-micro text-muted-foreground">+{colors.length - max}</span>}
    </div>
  )
}
