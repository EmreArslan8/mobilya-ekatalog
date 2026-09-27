"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PackageSearch } from "lucide-react"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeading } from "@/components/common/page-heading"
import { useCatalog } from "@/lib/catalog-context"
import { browse, QUICK_FILTERS, type QuickFilter, type SortKey, type ViewMode } from "@/lib/listing"
import { FilterChips } from "../listing/filter-chips"
import { ListingToolbar } from "../listing/listing-toolbar"
import { ProductGrid } from "../product/product-grid"
import { CategorySelector } from "./category-selector"

/** Tüm ürünler: kategori seçimi URL'de (?kategori=) tutulur → paylaşılabilir link. */
export function ProductBrowser() {
  const { data, products, cfg, catOf } = useCatalog()
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const category = params.get("kategori")
  const [quick, setQuick] = useState<QuickFilter>("all")
  const [sort, setSort] = useState<SortKey>("rec")
  const [view, setView] = useState<ViewMode>("grid")

  const setCategory = (slug: string | null) => {
    router.replace(slug ? `${path}?kategori=${slug}` : path, { scroll: false })
  }

  const counts = useMemo(() => Object.fromEntries(data.categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length])), [data.categories, products])
  const shown = useMemo(() => browse(products, { category, quick, sort }), [products, category, quick, sort])
  const chips = QUICK_FILTERS.filter((q) => cfg.showPrices || !q.needsPrice)
  const title = category ? catOf(category)?.name ?? "Ürünler" : "Tüm ürünler"

  return (
    <>
      <PageHeading title={title} count={`${shown.length} ürün`} />
      <CategorySelector categories={data.categories} counts={counts} total={products.length} value={category} onChange={setCategory} />
      <div className="sticky top-15 z-30 mt-4 border-y bg-background/90 backdrop-blur-xl md:top-17">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:px-8">
          <div className="min-w-0 md:flex-1">
            <FilterChips chips={chips} value={quick} onChange={(v) => setQuick(v as QuickFilter)} />
          </div>
          <ListingToolbar count={shown.length} sort={sort} onSort={setSort} view={view} onView={setView} showPrices={cfg.showPrices} />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        {shown.length ? (
          <ProductGrid products={shown} layout={view} />
        ) : (
          <EmptyState icon={PackageSearch} title="Ürün bulunamadı" text="Bu filtreye uygun ürün yok. Diğer seçeneklere göz atın." />
        )}
      </div>
    </>
  )
}
