"use client"

import { cn } from "@/lib/utils"

export interface Chip { value: string; label: string; count?: number }

export function FilterChips({ chips, value, onChange }: { chips: Chip[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {chips.map((c) => {
        const on = value === c.value
        return (
          <button
            key={c.value}
            onClick={() => onChange(c.value)}
            aria-pressed={on}
            className={cn(
              "h-10 shrink-0 rounded-md border px-4 t-small font-medium transition",
              on ? "border-foreground bg-foreground text-background" : "bg-card hover:border-foreground/40"
            )}
          >
            {c.label}
            {c.count != null && <span className={cn("ml-1.5 tabular-nums", on ? "opacity-60" : "text-muted-foreground")}>{c.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
