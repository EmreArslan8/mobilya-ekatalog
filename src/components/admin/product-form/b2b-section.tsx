"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/types"

/** İmalatçı modu alanları: minimum sipariş, termin, özelleştirme seçenekleri. */
export function B2BSection({ draft, set }: { draft: Product; set: <K extends keyof Product>(k: K, v: Product[K]) => void }) {
  const [tag, setTag] = useState("")
  const custom = draft.custom ?? []
  const add = () => {
    const t = tag.trim()
    if (t && !custom.includes(t)) set("custom", [...custom, t])
    setTag("")
  }
  return (
    <SectionCard title="Toptan / üretim" text="İmalatçı modunda ürün sayfasında gösterilir.">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Min. sipariş (adet)" htmlFor="p-moq">
            <Input id="p-moq" inputMode="numeric" value={draft.moq ?? ""} onChange={(e) => set("moq", parseInt(e.target.value) || 1)} />
          </Field>
          <Field label="Üretim süresi" htmlFor="p-lead">
            <Input id="p-lead" value={draft.leadTime ?? ""} onChange={(e) => set("leadTime", e.target.value)} placeholder="15–20 iş günü" />
          </Field>
        </div>
        <Field label="Özelleştirme seçenekleri" hint="Enter ile ekleyin (ör. Özel ölçü, Kumaş seçimi)">
          <div className="flex flex-wrap items-center gap-1.5 rounded-md border p-1.5">
            {custom.map((c) => (
              <span key={c} className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs">
                {c}
                <button type="button" onClick={() => set("custom", custom.filter((x) => x !== c))} aria-label="Kaldır"><X className="size-3" /></button>
              </span>
            ))}
            <input value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }} onBlur={add} className="h-7 min-w-32 flex-1 bg-transparent px-1 text-sm outline-none" placeholder="Seçenek ekle…" />
          </div>
        </Field>
      </div>
    </SectionCard>
  )
}
