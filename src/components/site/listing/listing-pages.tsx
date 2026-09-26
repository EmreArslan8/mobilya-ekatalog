"use client"

import { NotFoundView } from "@/components/common/not-found-view"
import { useCatalog } from "@/lib/catalog-context"
import { TAG_LABEL } from "@/lib/labels"
import type { ProductTag } from "@/lib/types"
import { ListingView } from "./listing-view"

/** Route → ListingView eşlemeleri. Sayfa dosyaları sadece bunları çağırır. */
export function CategoryListing({ slug }: { slug: string }) {
  const { catOf, products } = useCatalog()
  const c = catOf(slug)
  if (!c) return <NotFoundView />
  const items = products.filter((p) => p.category === slug)
  return <ListingView eyebrow="Kategori" title={c.name} cover={c.image} items={items} facetKey="collection" />
}

export function CollectionListing({ slug }: { slug: string }) {
  const { collOf, products, isB2B } = useCatalog()
  const c = collOf(slug)
  if (!c) return <NotFoundView />
  return <ListingView eyebrow={isB2B ? "Seri" : "Koleksiyon"} title={c.name} text={c.text} cover={c.image} items={products.filter((p) => p.collection === slug)} facetKey="category" />
}

const TAG_TITLES: Record<ProductTag, [string, string]> = {
  yeni: ["Bu sezon", "Yeni gelenler"],
  "cok-satan": ["En sevilenler", "Çok satanlar"],
  indirim: ["Fırsatlar", "İndirimdekiler"],
}

export function TagListing({ tag }: { tag: string }) {
  const { products } = useCatalog()
  if (!(tag in TAG_LABEL)) return <NotFoundView />
  const [eyebrow, title] = TAG_TITLES[tag as ProductTag]
  return <ListingView eyebrow={eyebrow} title={title} items={products.filter((p) => p.tags.includes(tag as ProductTag))} facetKey="category" />
}
