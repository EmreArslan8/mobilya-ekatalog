"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useDB } from "@/lib/store/db"
import type { SiteConfig } from "@/lib/types"

export type ConfigSetter = <K extends keyof SiteConfig>(k: K, v: SiteConfig[K]) => void

/** Ayarlar taslağı: değişiklikler "Kaydet"e kadar siteye yansımaz. */
export function useSettingsDraft() {
  const saved = useDB((s) => s.data.config)
  const updateConfig = useDB((s) => s.updateConfig)
  const [draft, setDraft] = useState<SiteConfig>(saved)
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)
  const set: ConfigSetter = (k, v) => setDraft((d) => ({ ...d, [k]: v }))
  const save = () => {
    if (!draft.name.trim()) return toast.error("Marka adı boş olamaz")
    updateConfig(draft)
    toast.success("Ayarlar kaydedildi", { description: "Değişiklikler sitede yayında." })
  }
  return { draft, set, dirty, save, reset: () => setDraft(saved), setDraft }
}
