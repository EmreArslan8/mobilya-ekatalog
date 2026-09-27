"use client"

import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ProductErrors } from "@/lib/admin/product-draft"
import type { Business, Product } from "@/lib/types"

interface Props {
  draft: Product
  set: <K extends keyof Product>(k: K, v: Product[K]) => void
  errors: ProductErrors
  data: Business
}

export function BasicsSection({ draft, set, errors, data }: Props) {
  const cats = data.categories.map((c) => ({ value: c.slug, label: c.name }))
  const colls = data.collections.map((c) => ({ value: c.slug, label: c.name }))
  return (
    <SectionCard title="Temel bilgiler">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <Field label="Ürün adı" htmlFor="p-name" error={errors.name}>
            <Input id="p-name" value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="ör. Vera Kadife Kanepe 3'lü" aria-invalid={!!errors.name} />
          </Field>
          <Field label="Ürün kodu (SKU)" htmlFor="p-sku" error={errors.sku}>
            <Input id="p-sku" value={draft.sku} onChange={(e) => set("sku", e.target.value.toUpperCase())} aria-invalid={!!errors.sku} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kategori" error={errors.category}>
            <Select items={cats} value={draft.category} onValueChange={(v) => set("category", String(v))}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Seçin" /></SelectTrigger>
              <SelectContent>{cats.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label={data.config.mode === "b2b" ? "Seri" : "Koleksiyon"}>
            <Select items={colls} value={draft.collection} onValueChange={(v) => set("collection", String(v))}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Seçin" /></SelectTrigger>
              <SelectContent>{colls.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Açıklama" htmlFor="p-desc" hint="Ürün sayfasında görünür. Konfor, kullanım alanı ve öne çıkan özellikleri yazın.">
          <Textarea id="p-desc" rows={4} value={draft.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
        <Field label="Malzeme" htmlFor="p-mat" hint="ör. Kadife kumaş · Masif kayın ayak">
          <Input id="p-mat" value={draft.material} onChange={(e) => set("material", e.target.value)} />
        </Field>
      </div>
    </SectionCard>
  )
}
