"use client"

import { useDB } from "./store/db"

/** Katalog tarafı için tek erişim noktası: veri + sık kullanılan seçiciler. */
export function useCatalog() {
  const data = useDB((s) => s.data)
  const cfg = data.config
  const b2b = cfg.mode === "b2b"
  return {
    data,
    cfg,
    isB2B: b2b,
    /** Sepet dili moda göre değişir */
    cartLabel: b2b ? "Teklif listesi" : "Sepet",
    products: data.products.filter((p) => p.published),
    catOf: (slug: string) => data.categories.find((x) => x.slug === slug),
    collOf: (slug: string) => data.collections.find((x) => x.slug === slug),
    product: (id: string) => data.products.find((x) => x.id === id && x.published),
  }
}
