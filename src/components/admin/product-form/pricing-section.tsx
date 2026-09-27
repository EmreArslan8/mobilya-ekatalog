"use client"

import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { StockSelect } from "@/components/admin/products/stock-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { TAG_LABEL } from "@/lib/labels"
import type { Product, ProductTag, SiteConfig } from "@/lib/types"

interface Props {
  draft: Product
  set: <K extends keyof Product>(k: K, v: Product[K]) => void
  cfg: SiteConfig
  error?: string
}

const num = (s: string) => (s.trim() === "" ? null : parseInt(s.replace(/\D/g, "")) || null)

export function PricingSection({ draft, set, cfg, error }: Props) {
  const toggleTag = (t: ProductTag, on: boolean) => set("tags", on ? [...draft.tags, t] : draft.tags.filter((x) => x !== t))
  return (
    <SectionCard title="Durum, fiyat & stok">
      <div className="grid gap-5">
        <label className="flex items-center justify-between gap-3 rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">Sitede yayında</p>
            <p className="text-xs text-muted-foreground">Kapalıysa ürün sitede görünmez.</p>
          </div>
          <Switch checked={draft.published} onCheckedChange={(v) => set("published", v)} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Satış fiyatı (₺)" htmlFor="p-price" error={error} hint={!cfg.showPrices ? "Sitede fiyat gizli (ayarlar)" : undefined}>
            <Input id="p-price" inputMode="numeric" value={draft.price ?? ""} onChange={(e) => set("price", num(e.target.value))} aria-invalid={!!error} />
          </Field>
          <Field label="Eski fiyat (₺)" htmlFor="p-old" hint="İndirim göstermek için">
            <Input id="p-old" inputMode="numeric" value={draft.oldPrice ?? ""} onChange={(e) => set("oldPrice", num(e.target.value))} />
          </Field>
        </div>

        <Field label="Stok durumu">
          <StockSelect value={draft.stock} onChange={(v) => set("stock", v)} className="h-9 w-full" />
        </Field>

        <Field label="Etiketler">
          <div className="flex flex-wrap gap-4 pt-1">
            {(Object.keys(TAG_LABEL) as ProductTag[]).map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <Checkbox checked={draft.tags.includes(t)} onCheckedChange={(v) => toggleTag(t, !!v)} /> {TAG_LABEL[t]}
              </label>
            ))}
          </div>
        </Field>
      </div>
    </SectionCard>
  )
}
