"use client"

import { useMemo, useState } from "react"
import { PackageSearch } from "lucide-react"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeading } from "@/components/common/page-heading"
import { useCatalog } from "@/lib/catalog-context"
import { applyListing, type SortKey, type ViewMode } from "@/lib/listing"
import type { Product } from "@/lib/types"
import { ProductGrid } from "../product/product-grid"
import { FilterChips, type Chip } from "./filter-chips"
import { ListingToolbar } from "./listing-toolbar"
import { PageCover } from "./page-cover"

interface Props {
  title: string
  eyebrow?: string
  text?: string
  cover?: string
  items: Product[]
  /** Sayfanın "diğer boyutu": kategori sayfasında koleksiyon, koleksiyonda kategori */
  facetKey: "category" | "collection"
}

/** Kategori / koleksiyon / etiket sayfalarının ortak listeleme motoru. */
export function ListingView({ title, eyebrow, text, cover, items, facetKey }: Props) {
  const { cfg, catOf, collOf } = useCatalog()
  const [facet, setFacet] = useState("all")
  const [sort, setSort] = useState<SortKey>("rec")
  const [view, setView] = useState<ViewMode>("grid")

  const chips = useMemo<Chip[]>(() => {
    const nameOf = facetKey === "category" ? catOf : collOf
    const values = [...new Set(items.map((p) => p[facetKey]))]
    return [
      { value: "all", label: "Tümü", count: items.length },
      { value: "stokta", label: "Hemen teslim" },
      ...(cfg.showPrices && items.some((p) => p.oldPrice) ? [{ value: "indirim", label: "İndirimde" }] : []),
      ...(values.length > 1 ? values.map((v) => ({ value: v, label: nameOf(v)?.name ?? v, count: items.filter((p) => p[facetKey] === v).length })) : []),
    ]
  }, [items, facetKey, cfg.showPrices, catOf, collOf])

  const shown = useMemo(() => applyListing(items, facet, facetKey, sort), [items, facet, facetKey, sort])

  return (
    <>
      {cover ? <PageCover image={cover} eyebrow={eyebrow} title={title} text={text} /> : <PageHeading eyebrow={eyebrow} title={title} text={text} />}
      <div className="sticky top-15 z-30 border-b bg-background/90 backdrop-blur-xl md:top-17">
        <div className="mx-auto max-w-7xl space-y-3 px-5 py-3 md:flex md:items-center md:gap-6 md:space-y-0 md:px-8">
          <div className="min-w-0 md:flex-1"><FilterChips chips={chips} value={facet} onChange={setFacet} /></div>
          <div className="md:w-auto"><ListingToolbar count={shown.length} sort={sort} onSort={setSort} view={view} onView={setView} showPrices={cfg.showPrices} /></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-10">
        {shown.length ? <ProductGrid products={shown} layout={view} /> : <EmptyState icon={PackageSearch} title="Ürün bulunamadı" text="Bu filtreye uygun ürün yok. Diğer seçeneklere göz atın." />}
      </div>
    </>
  )
}
