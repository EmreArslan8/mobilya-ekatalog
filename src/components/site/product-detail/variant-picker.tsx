"use client"

import type { Color } from "@/lib/types"
import { cn } from "@/lib/utils"

export function VariantPicker({ colors, value, onChange }: { colors: Color[]; value: number; onChange: (i: number) => void }) {
  return (
    <div>
      <p className="t-small">
        <span className="t-eyebrow text-muted-foreground">Renk / Kumaş</span>
        <span className="ml-3 font-medium">{colors[value]?.name}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => onChange(i)}
            aria-label={c.name}
            aria-pressed={i === value}
            className={cn("rounded-full p-1 ring-1 transition", i === value ? "ring-foreground" : "ring-transparent hover:ring-border")}
          >
            <span className="block size-9 rounded-full ring-1 ring-black/10 ring-inset" style={{ background: c.hex }} />
          </button>
        ))}
      </div>
    </div>
  )
}
