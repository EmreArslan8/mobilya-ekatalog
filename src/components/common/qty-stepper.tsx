"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  value: number
  onChange: (v: number) => void
  min?: number
  size?: "sm" | "md"
}

export function QtyStepper({ value, onChange, min = 1, size = "md" }: Props) {
  const btn = cn("grid place-items-center rounded-full transition hover:bg-muted active:scale-90 disabled:opacity-30", size === "sm" ? "size-8" : "size-10")
  return (
    <div className="inline-flex items-center rounded-full border bg-card">
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Azalt">
        <Minus className="size-4" />
      </button>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className={cn("bg-transparent text-center font-bold tabular-nums outline-none", size === "sm" ? "w-8 t-small" : "w-10 t-body")}
        aria-label="Adet"
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Arttır">
        <Plus className="size-4" />
      </button>
    </div>
  )
}
