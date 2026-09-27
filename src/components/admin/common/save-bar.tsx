"use client"

import { Button } from "@/components/ui/button"

/** Kaydedilmemiş değişiklik varken altta beliren kaydet çubuğu. */
export function SaveBar({ visible, onSave, onDiscard, isNew }: { visible: boolean; onSave: () => void; onDiscard: () => void; isNew: boolean }) {
  if (!visible) return null
  return (
    <div className="sticky bottom-4 z-20 mt-6 flex items-center justify-between gap-3 rounded-xl border bg-foreground px-4 py-3 text-background shadow-lg animate-in slide-in-from-bottom-4 fade-in">
      <span className="text-sm">{isNew ? "Yeni ürün kaydedilmedi" : "Kaydedilmemiş değişiklikler"}</span>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="text-background hover:bg-background/10 hover:text-background" onClick={onDiscard}>Vazgeç</Button>
        <Button size="sm" className="bg-background text-foreground hover:bg-background/90" onClick={onSave}>Kaydet</Button>
      </div>
    </div>
  )
}
