"use client"

import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FONT_PRESETS, THEME_PRESETS } from "@/lib/theme"
import type { FontPreset, SiteConfig, Theme } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ThemePreview } from "./theme-preview"
import type { ConfigSetter } from "./use-settings-draft"

const COLOR_FIELDS: [keyof Theme, string][] = [
  ["bg", "Arka plan"], ["surface", "Kart / yüzey"], ["ink", "Metin"], ["muted", "İkincil metin"],
  ["accent", "Ana renk (buton)"], ["accentInk", "Buton yazısı"], ["line", "Çizgiler"], ["sale", "İndirim rengi"],
]
const RADII = [{ value: "2", label: "Keskin (lüks)" }, { value: "8", label: "Hafif yuvarlak" }, { value: "16", label: "Yuvarlak" }]
const FONTS = (Object.keys(FONT_PRESETS) as FontPreset[]).map((k) => ({ value: k, label: FONT_PRESETS[k].label }))

export function AppearanceTab({ draft, set }: { draft: SiteConfig; set: ConfigSetter }) {
  const t = draft.theme
  const setT = (patch: Partial<Theme>) => set("theme", { ...t, ...patch })
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-5">
        <SectionCard title="Hazır paletler">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {THEME_PRESETS.map((p) => {
              const on = p.theme.bg === t.bg && p.theme.accent === t.accent
              return (
                <button key={p.name} type="button" onClick={() => setT(p.theme)} className={cn("overflow-hidden rounded-lg border text-left transition", on ? "ring-2 ring-foreground" : "hover:border-foreground/30")}>
                  <div className="flex h-12" style={{ background: p.theme.bg }}>
                    {[p.theme.accent, p.theme.ink, p.theme.surface2, p.theme.sale].map((c, i) => <span key={i} className="m-2 mr-0 size-8 rounded-full ring-1 ring-black/10" style={{ background: c }} />)}
                  </div>
                  <p className="px-3 py-2 text-sm font-medium">{p.name}{p.theme.scheme === "dark" ? " · koyu" : ""}</p>
                </button>
              )
            })}
          </div>
        </SectionCard>
        <SectionCard title="Tipografi & köşeler">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Yazı tipi">
              <Select items={FONTS} value={t.font} onValueChange={(v) => setT({ font: v as FontPreset })}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{FONTS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Köşe yapısı">
              <Select items={RADII} value={String(t.radius)} onValueChange={(v) => setT({ radius: Number(v) })}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{RADII.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </div>
        </SectionCard>
        <SectionCard title="Renkler" text="Marka renklerinize göre ince ayar yapın.">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {COLOR_FIELDS.map(([k, l]) => (
              <Field key={k} label={l}>
                <div className="flex items-center gap-2 rounded-md border p-1">
                  <label className="relative size-7 shrink-0 cursor-pointer overflow-hidden rounded ring-1 ring-black/10" style={{ background: t[k] as string }}>
                    <input type="color" value={t[k] as string} onChange={(e) => setT({ [k]: e.target.value })} className="absolute inset-0 opacity-0" />
                  </label>
                  <Input value={t[k] as string} onChange={(e) => setT({ [k]: e.target.value })} className="h-7 border-0 px-1 font-mono text-xs shadow-none" />
                </div>
              </Field>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="xl:sticky xl:top-20 xl:self-start"><ThemePreview cfg={draft} /></div>
    </div>
  )
}
