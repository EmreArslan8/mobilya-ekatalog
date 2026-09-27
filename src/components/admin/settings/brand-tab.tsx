"use client"

import { Factory, Store } from "lucide-react"
import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { CatalogMode, SiteConfig } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ConfigSetter } from "./use-settings-draft"

const MODES: { value: CatalogMode; icon: typeof Store; title: string; text: string }[] = [
  { value: "retail", icon: Store, title: "Mağaza (perakende)", text: "Fiyatlar görünür, müşteri sepetini WhatsApp’tan sipariş olarak gönderir." },
  { value: "b2b", icon: Factory, title: "İmalatçı / toptan", text: "Fiyatlar gizli; min. sipariş ve termin gösterilir, liste teklif talebi olarak gönderilir." },
]

export function BrandTab({ draft, set }: { draft: SiteConfig; set: ConfigSetter }) {
  const setMode = (mode: CatalogMode) => {
    set("mode", mode)
    set("showPrices", mode === "retail")
  }
  return (
    <div className="grid gap-5">
      <SectionCard title="Marka">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Firma adı" htmlFor="s-name"><Input id="s-name" value={draft.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Logo yazısı" htmlFor="s-short" hint="Üst menüde görünen kısa ad"><Input id="s-short" value={draft.shortName} onChange={(e) => set("shortName", e.target.value)} /></Field>
          <Field label="Slogan" htmlFor="s-tag"><Input id="s-tag" value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} /></Field>
          <Field label="Katalog adı" htmlFor="s-cat" hint="ör. 2026 Sonbahar Kataloğu"><Input id="s-cat" value={draft.catalogTitle} onChange={(e) => set("catalogTitle", e.target.value)} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Satış modeli" text="Sitenin nasıl sipariş alacağını belirler.">
        <div className="grid gap-3 sm:grid-cols-2">
          {MODES.map((m) => (
            <button key={m.value} type="button" onClick={() => setMode(m.value)} className={cn("flex gap-3 rounded-lg border p-4 text-left transition", draft.mode === m.value ? "border-foreground ring-1 ring-foreground" : "hover:border-foreground/30")}>
              <m.icon className="mt-0.5 size-5 shrink-0" />
              <div><p className="font-medium">{m.title}</p><p className="mt-1 text-xs text-muted-foreground">{m.text}</p></div>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex items-center justify-between gap-3 rounded-lg border p-3">
            <div><p className="text-sm font-medium">Fiyatları göster</p><p className="text-xs text-muted-foreground">Kapalıyken fiyat yerine aşağıdaki metin görünür</p></div>
            <Switch checked={draft.showPrices} onCheckedChange={(v) => set("showPrices", v)} />
          </label>
          <Field label="Fiyat yerine gösterilecek metin" htmlFor="s-pl"><Input id="s-pl" value={draft.priceLabel} onChange={(e) => set("priceLabel", e.target.value)} disabled={draft.showPrices} /></Field>
        </div>
      </SectionCard>
    </div>
  )
}
