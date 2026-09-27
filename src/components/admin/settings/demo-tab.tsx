"use client"

import { useState } from "react"
import { Factory, RotateCcw, Store } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { SectionCard } from "@/components/admin/common/section-card"
import { Button } from "@/components/ui/button"
import { DEMO_PRESETS, useDB, type DemoPreset } from "@/lib/store/db"

/** Sunum için: hazır demo verisini yükle. (Gerçek kurulumda bu sekme kaldırılır.) */
export function DemoTab({ onLoaded }: { onLoaded: () => void }) {
  const load = useDB((s) => s.loadPreset)
  const [pending, setPending] = useState<DemoPreset | null>(null)
  const icons = { retail: Store, manufacturer: Factory }
  return (
    <SectionCard title="Demo verisi" text="Sunumlarda farklı müşteri tiplerini göstermek için hazır veri setleri. Mevcut değişikliklerin üzerine yazar.">
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(DEMO_PRESETS) as DemoPreset[]).map((k) => {
          const Icon = icons[k]
          const d = DEMO_PRESETS[k].data
          return (
            <div key={k} className="flex flex-col gap-3 rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Icon className="size-5" />
                <div><p className="font-medium">{d.config.name}</p><p className="text-xs text-muted-foreground">{DEMO_PRESETS[k].label} · {d.products.length} ürün</p></div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setPending(k)}><RotateCcw /> Bu veriyi yükle</Button>
            </div>
          )
        })}
      </div>
      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title="Demo verisi yüklensin mi?"
        text="Tüm ürünler, kategoriler ve ayarlar seçilen demo verisiyle değiştirilecek."
        confirmLabel="Yükle"
        onConfirm={() => { if (pending) { load(pending); onLoaded(); toast.success("Demo verisi yüklendi") } }}
      />
    </SectionCard>
  )
}
