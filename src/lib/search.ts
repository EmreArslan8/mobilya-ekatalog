import { norm } from "./text"
import type { Business } from "./types"

/** Basit, bağımlılıksız ürün araması: tüm kelimeler eşleşmeli, isim eşleşmesi öne çıkar. */
export function searchProducts(t: Business, raw: string) {
  const q = norm(raw.trim())
  if (!q) return []
  const words = q.split(/\s+/)
  const catName = (s: string) => t.categories.find((c) => c.slug === s)?.name ?? ""
  const colName = (s: string) => t.collections.find((c) => c.slug === s)?.name ?? ""
  return t.products
    .filter((p) => p.published)
    .map((p) => {
      const hay = norm([p.name, p.sku, p.material, catName(p.category), colName(p.collection), ...p.colors.map((c) => c.name)].join(" "))
      if (!words.every((w) => hay.includes(w))) return null
      const n = norm(p.name)
      return { p, score: n.startsWith(q) ? 3 : n.includes(q) ? 2 : 1 }
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
}
