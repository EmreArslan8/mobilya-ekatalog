"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Star, Trash2 } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import { cn } from "@/lib/utils"
import { ImagePickerDialog } from "./image-picker-dialog"

/** Çoklu görsel: ilk görsel kapaktır; sırala, kapak yap, sil. */
export function ImagesField({ value, onChange, error }: { value: string[]; onChange: (v: string[]) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const move = (i: number, d: -1 | 1) => {
    const next = [...value]
    const j = i + d
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const btn = "grid size-7 place-items-center rounded-md bg-white/90 text-neutral-900 shadow-sm hover:bg-white disabled:opacity-40"
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((img, i) => (
          <div key={`${i}-${img.slice(0, 40)}`} className="group relative overflow-hidden rounded-lg border">
            <SmartImg src={img} className="aspect-[4/5]" />
            {i === 0 && <span className="absolute top-2 left-2 rounded-md bg-foreground px-2 py-0.5 text-[11px] font-medium text-background">Kapak</span>}
            <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
              <div className="flex gap-1">
                <button type="button" className={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Sola taşı"><ChevronLeft className="size-4" /></button>
                <button type="button" className={btn} onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Sağa taşı"><ChevronRight className="size-4" /></button>
              </div>
              <div className="flex gap-1">
                {i > 0 && <button type="button" className={btn} onClick={() => onChange([img, ...value.filter((_, n) => n !== i)])} aria-label="Kapak yap"><Star className="size-3.5" /></button>}
                <button type="button" className={cn(btn, "text-destructive")} onClick={() => onChange(value.filter((_, n) => n !== i))} aria-label="Sil"><Trash2 className="size-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setOpen(true)} className={cn("flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-sm text-muted-foreground transition hover:border-foreground/30 hover:bg-muted/50", error && "border-destructive/60")}>
          <Plus className="size-5" /> Görsel ekle
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      <ImagePickerDialog open={open} onOpenChange={setOpen} multiple onPick={(r) => onChange([...value, ...r])} />
    </div>
  )
}
