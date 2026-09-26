"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import manufacturer from "../seed/manufacturer.json"
import retail from "../seed/retail.json"
import type { Business, Category, Collection, Product, SiteConfig } from "../types"
import { safeStorage } from "./safe-storage"

/**
 * Katalog deposu (repository) — tüm okuma/yazma buradan geçer.
 * Demo'da localStorage'a yazar; gerçek backend'e geçişte sadece bu dosya değişir.
 */
export const DEMO_PRESETS = {
  retail: { label: "Mobilya mağazası (fiyatlı)", data: retail as unknown as Business },
  manufacturer: { label: "İmalatçı / toptan (teklifli)", data: manufacturer as unknown as Business },
} as const
export type DemoPreset = keyof typeof DEMO_PRESETS

type Taxonomy = "categories" | "collections"
type TaxItem = Category | Collection

interface DBState {
  data: Business
  updateConfig: (patch: Partial<SiteConfig>) => void
  saveProduct: (p: Product) => void
  deleteProduct: (id: string) => void
  saveTaxonomy: (kind: Taxonomy, item: TaxItem, prevSlug?: string) => void
  deleteTaxonomy: (kind: Taxonomy, slug: string) => void
  loadPreset: (key: DemoPreset) => void
}

export const useDB = create<DBState>()(
  persist(
    (set) => {
      const edit = (fn: (d: Business) => Business) =>
        set((s) => ({ data: { ...fn(s.data), updatedAt: new Date().toISOString() } }))

      return {
        data: DEMO_PRESETS.retail.data,
        updateConfig: (patch) => edit((d) => ({ ...d, config: { ...d.config, ...patch } })),
        saveProduct: (p) =>
          edit((d) => {
            const exists = d.products.some((x) => x.id === p.id)
            return { ...d, products: exists ? d.products.map((x) => (x.id === p.id ? p : x)) : [p, ...d.products] }
          }),
        deleteProduct: (id) => edit((d) => ({ ...d, products: d.products.filter((x) => x.id !== id) })),
        saveTaxonomy: (kind, item, prevSlug) =>
          edit((d) => {
            const key = kind === "categories" ? "category" : "collection"
            const list = d[kind] as TaxItem[]
            const exists = !!prevSlug && list.some((x) => x.slug === prevSlug)
            const next = exists ? list.map((x) => (x.slug === prevSlug ? item : x)) : [...list, item]
            // slug değiştiyse ürünlerdeki referansları da taşı
            const moved = prevSlug && prevSlug !== item.slug
            const products = moved ? d.products.map((p) => (p[key] === prevSlug ? { ...p, [key]: item.slug } : p)) : d.products
            return { ...d, [kind]: next, products }
          }),
        deleteTaxonomy: (kind, slug) =>
          edit((d) => ({ ...d, [kind]: (d[kind] as TaxItem[]).filter((x) => x.slug !== slug) })),
        loadPreset: (key) => set({ data: DEMO_PRESETS[key].data }),
      }
    },
    { name: "ekatalog-db", version: 3, storage: safeStorage, skipHydration: true }
  )
)
