"use client"

import { Plus, Trash2 } from "lucide-react"
import { SectionCard } from "@/components/admin/common/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Color } from "@/lib/types"

const SUGGESTED: Color[] = [
  { name: "Bej", hex: "#D9C7AE" }, { name: "Antrasit", hex: "#3A3D42" }, { name: "Krem", hex: "#EDE3D2" },
  { name: "Zümrüt", hex: "#1F5B4B" }, { name: "Taba", hex: "#A0643A" }, { name: "Lacivert", hex: "#1F2A44" },
  { name: "Ceviz", hex: "#6B4A31" }, { name: "Meşe", hex: "#C49A6C" },
]

/** Renk / kumaş varyantları: ad + renk kodu. Hazır öneriler tek tıkla eklenir. */
export function VariantsSection({ value, onChange, error }: { value: Color[]; onChange: (c: Color[]) => void; error?: string }) {
  const update = (i: number, patch: Partial<Color>) => onChange(value.map((c, n) => (n === i ? { ...c, ...patch } : c)))
  const available = SUGGESTED.filter((s) => !value.some((v) => v.name === s.name))
  return (
    <SectionCard title="Renk / kumaş seçenekleri" text="Müşteri ürün sayfasında bu seçeneklerden birini seçer.">
      <ul className="grid gap-2">
        {value.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            <label className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-md border" style={{ background: c.hex }}>
              <input type="color" value={c.hex} onChange={(e) => update(i, { hex: e.target.value })} className="absolute inset-0 opacity-0" aria-label="Renk" />
            </label>
            <Input value={c.name} onChange={(e) => update(i, { name: e.target.value })} placeholder="Renk adı" className="flex-1" />
            <Input value={c.hex} onChange={(e) => update(i, { hex: e.target.value })} className="w-28 font-mono text-xs" aria-label="Renk kodu" />
            <Button type="button" variant="ghost" size="icon" onClick={() => onChange(value.filter((_, n) => n !== i))} disabled={value.length === 1} aria-label="Sil">
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, { name: "", hex: "#999999" }])}><Plus /> Boş seçenek</Button>
        {available.map((s) => (
          <button key={s.name} type="button" onClick={() => onChange([...value, s])} className="flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs hover:bg-muted">
            <span className="size-3 rounded-full ring-1 ring-black/10" style={{ background: s.hex }} /> {s.name}
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
