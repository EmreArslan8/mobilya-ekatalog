import type { Product } from "./types"

export type SortKey = "rec" | "new" | "asc" | "desc" | "az"
export type ViewMode = "grid" | "list"

export const SORT_OPTIONS: { value: SortKey; label: string; needsPrice?: boolean }[] = [
  { value: "rec", label: "Önerilen" },
  { value: "new", label: "En yeniler" },
  { value: "asc", label: "Fiyat: artan", needsPrice: true },
  { value: "desc", label: "Fiyat: azalan", needsPrice: true },
  { value: "az", label: "A → Z" },
]

const SORTERS: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  rec: null,
  new: (a, b) => b.createdAt.localeCompare(a.createdAt),
  asc: (a, b) => (a.price ?? 0) - (b.price ?? 0),
  desc: (a, b) => (b.price ?? 0) - (a.price ?? 0),
  az: (a, b) => a.name.localeCompare(b.name, "tr"),
}

/** facet: "all" | "stokta" | "indirim" | <facetKey değeri> */
export function applyListing(items: Product[], facet: string, facetKey: "category" | "collection", sort: SortKey) {
  const filtered =
    facet === "all" ? items
    : facet === "stokta" ? items.filter((p) => p.stock === "stokta")
    : facet === "indirim" ? items.filter((p) => p.oldPrice)
    : items.filter((p) => p[facetKey] === facet)
  const s = SORTERS[sort]
  return s ? [...filtered].sort(s) : filtered
}

export const visible = (products: Product[]) => products.filter((p) => p.published)
