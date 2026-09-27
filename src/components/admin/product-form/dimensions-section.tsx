"use client"

import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/types"

type Dims = Product["dimensions"]

export function DimensionsSection({ value, onChange }: { value: Dims; onChange: (d: Dims) => void }) {
  const fields: [keyof Dims, string][] = [["w", "Genişlik"], ["d", "Derinlik"], ["h", "Yükseklik"]]
  return (
    <SectionCard title="Ölçüler" text="Santimetre cinsinden.">
      <div className="grid grid-cols-3 gap-3">
        {fields.map(([k, l]) => (
          <Field key={k} label={l} htmlFor={`d-${k}`}>
            <div className="relative">
              <Input id={`d-${k}`} inputMode="numeric" value={value[k] || ""} onChange={(e) => onChange({ ...value, [k]: parseInt(e.target.value.replace(/\D/g, "")) || 0 })} className="pr-9" />
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">cm</span>
            </div>
          </Field>
        ))}
      </div>
    </SectionCard>
  )
}
