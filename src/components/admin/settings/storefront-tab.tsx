"use client"

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { ImageField } from "@/components/admin/media/image-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Business, HeroSlide, SiteConfig } from "@/lib/types"
import type { ConfigSetter } from "./use-settings-draft"

/** Ana sayfa vitrini: banner slaytları + üst şeritteki avantajlar. */
export function StorefrontTab({ draft, set, data }: { draft: SiteConfig; set: ConfigSetter; data: Business }) {
  const slides = draft.hero
  const upd = (i: number, patch: Partial<HeroSlide>) => set("hero", slides.map((s, n) => (n === i ? { ...s, ...patch } : s)))
  const move = (i: number, d: -1 | 1) => { const n = [...slides]; [n[i], n[i + d]] = [n[i + d], n[i]]; set("hero", n) }
  const links = [
    { value: "urunler", label: "Tüm ürünler" },
    ...data.collections.map((c) => ({ value: `koleksiyon/${c.slug}`, label: `Koleksiyon: ${c.name}` })),
    ...data.categories.map((c) => ({ value: `urunler?kategori=${c.slug}`, label: `Kategori: ${c.name}` })),
  ]
  return (
    <div className="grid gap-5">
      <SectionCard title="Ana sayfa banner’ları" text="Sırayla dönen tam genişlik görseller." action={<Button size="sm" variant="outline" onClick={() => set("hero", [...slides, { image: "scene-cream", eyebrow: "Yeni", title: "Yeni banner", text: "", cta: "İncele", link: "urunler" }])}><Plus /> Banner ekle</Button>}>
        <div className="grid gap-4">
          {slides.map((s, i) => (
            <div key={i} className="grid gap-4 rounded-lg border p-4 md:grid-cols-[240px_1fr]">
              <ImageField value={s.image} onChange={(image) => upd(i, { image })} aspect="aspect-[16/10]" />
              <div className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                  <Field label="Üst yazı"><Input value={s.eyebrow} onChange={(e) => upd(i, { eyebrow: e.target.value })} /></Field>
                  <Field label="Başlık"><Input value={s.title} onChange={(e) => upd(i, { title: e.target.value })} /></Field>
                </div>
                <Field label="Açıklama"><Input value={s.text} onChange={(e) => upd(i, { text: e.target.value })} /></Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Buton yazısı"><Input value={s.cta} onChange={(e) => upd(i, { cta: e.target.value })} /></Field>
                  <Field label="Buton hedefi">
                    <select value={s.link} onChange={(e) => upd(i, { link: e.target.value })} className="h-8 w-full rounded-lg border bg-transparent px-2 text-sm">
                      {!links.some((l) => l.value === s.link) && <option value={s.link}>{s.link}</option>}
                      {links.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="flex justify-end gap-1">
                  <Button size="icon-sm" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Yukarı"><ArrowUp /></Button>
                  <Button size="icon-sm" variant="ghost" disabled={i === slides.length - 1} onClick={() => move(i, 1)} aria-label="Aşağı"><ArrowDown /></Button>
                  <Button size="icon-sm" variant="ghost" disabled={slides.length === 1} onClick={() => set("hero", slides.filter((_, n) => n !== i))} aria-label="Sil"><Trash2 /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Avantajlar" text="Sitenin en üstündeki kayan şeritte görünür.">
        <div className="grid gap-2 sm:grid-cols-2">
          {draft.perks.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Input value={p} onChange={(e) => set("perks", draft.perks.map((x, n) => (n === i ? e.target.value : x)))} />
              <Button size="icon" variant="ghost" onClick={() => set("perks", draft.perks.filter((_, n) => n !== i))} aria-label="Sil"><Trash2 /></Button>
            </div>
          ))}
        </div>
        <Button size="sm" variant="outline" className="mt-3" onClick={() => set("perks", [...draft.perks, ""])}><Plus /> Ekle</Button>
      </SectionCard>
    </div>
  )
}
