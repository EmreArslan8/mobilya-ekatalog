import type { Business } from "../types"

export function catalogStats(d: Business) {
  const ps = d.products
  return {
    total: ps.length,
    published: ps.filter((p) => p.published).length,
    drafts: ps.filter((p) => !p.published).length,
    inStock: ps.filter((p) => p.stock === "stokta").length,
    low: ps.filter((p) => p.stock === "az"),
    onOrder: ps.filter((p) => p.stock === "siparis" || p.stock === "uretim").length,
    onSale: ps.filter((p) => p.oldPrice).length,
    categories: d.categories.length,
    collections: d.collections.length,
    recent: [...ps].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
  }
}
