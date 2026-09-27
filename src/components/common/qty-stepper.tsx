"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  value: number
  onChange: (v: number) => void
  min?: number
  /** sm: sepet satırı · lg: ürün sayfası (butonlarla aynı yükseklik) */
  size?: "sm" | "lg"
  className?: string
}

export function QtyStepper({ value, onChange, min = 1, size = "lg", className }: Props) {
  const lg = size === "lg"
  const btn = cn("grid h-full place-items-center transition hover:bg-muted disabled:opacity-30", lg ? "w-12" : "w-9")
  return (
    <div className={cn("inline-flex items-stretch overflow-hidden rounded-[var(--radius)] border bg-card", lg ? "h-14" : "h-9", className)}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Azalt">
        <Minus className="size-4" strokeWidth={1.6} />
      </button>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className={cn("min-w-0 flex-1 bg-transparent text-center font-medium tabular-nums outline-none", lg ? "w-12 t-body" : "w-8 t-small")}
        aria-label="Adet"
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Arttır">
        <Plus className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  )
}
